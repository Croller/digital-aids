/* eslint-disable no-console */
const { addedDiff, updatedDiff } = require('deep-object-diff');
const db = require('../services/db');
const socket = require('../services/socket');
const google = require('../services/google');
const commonUtils = require('../utils/common');

const MEDIA_KEYS = ['files', 'images'];
const TRANSLATE_KEYS = ['name', 'description'];
let results = [];

const mapFields = (type) => {
  const typeEdit = type.replace(/ /g, '_').toLowerCase();
  const mapper = {
    integer: { type: 'number', value: 0 },
    double_precision: { type: 'float', value: 0.0 },
    uuid: { type: 'string', value: '' },
    character_varying: { type: 'string', value: '' },
    jsonb: { type: 'object', value: {} },
    boolean: { type: 'boolean', value: false },
    ARRAY: { type: 'array', value: [] },
    timestamp_with_time_zone: { type: 'datetime', value: null },
    geometry: { type: 'geometry', value: null },
  };
  return { type_db: typeEdit, ...mapper[typeEdit] };
};

const isTable = async (table = null) => {
  results = await db.knex('information_schema.tables').where({ table_name: table });
  return results.length === 1;
};

const getWordsPermit = async () => {
  results = await db.knex('pg_get_keywords()').select();
  return results;
};

const getTableAll = async () => {
  results = await db.knex('information_schema.tables').select();
  return results;
};

const getTables = async (tables, options = {}) => {
  results = await Promise.all(tables.map(async (table) => {
    const result = await db.knex(table).where({ ...options });
    return { [table]: result }; 
  }));
  return results.reduce((obj, arr) => ({ ...obj, ...arr }), {});
};

const getTableFields = async (table) => {
  results = await db.knex('information_schema.columns').where({ table_name: table });
  if (results.length === 0) return null;
  return results.reduce((obj, { column_name, data_type }) => ({ ...obj, [column_name]: mapFields(data_type) }), {});
};

const getTableStats = async (table) => {
  try {
    const fieldsTable = await getTableFields(table);
    results = await Promise.all(Object.keys(fieldsTable).map(async (key) => {
      const group = await db.knex(table).select(key).groupBy(key);
      return group;
    }));
    return results.reduce((obj, item) => {
      const key = Object.keys(item[0])[0];
      const values = item.reduce((arr, row) => {
        let val = Array.isArray(row[key]) ? row[key].reduce((oa, a) => [...oa, a], []) : [row[key]];
        val = val.filter(v => !arr.some(s => s === v));
        return [...arr, ...(val || [])];
      }, []);
      return { ...obj, [key]: values.sort((a, b) => a - b) };
    }, {});
  } catch (err) {
    console.log('Stats error', JSON.stringify(err.message));
    return null;
  }
};

const logRecord = async (table, id) => {
  if (table.indexOf('data_') > -1) {
    const filtred = await db.knex(table).where({ id });
    const logsTable = table.replace('data_', 'logs_');
    const existTable = await isTable(logsTable);
    if (existTable && filtred.length === 1) {
      await db.knex(logsTable).insert(filtred[0]);
      return true;
    }
  }
  return false;
};

const translateRecord = async (source = null, sourceLng = 'en', targetLng = 'en') => {
  if (!source || sourceLng === targetLng) return null;
  try {
    const separator = ' || ';
    const record = { ...source };
    const keysTr = TRANSLATE_KEYS.filter(key => record[key] && key);
    const arrTr = keysTr.map(key => record[key]);
    if (!arrTr || (arrTr && arrTr.length === 0)) return null;

    const text = arrTr.length > 1 ? arrTr.join(separator) : arrTr[0];
    const resultsTr = await google.getTextTranslate({ text, sourceLng, targetLng });
    if (resultsTr.error) return null;

    if (arrTr.length === 1) {
      const key = keysTr[0];
      record[key] = resultsTr[0].translatedText;
    } else {
      const textArr = resultsTr[0].translatedText.split(separator);
      keysTr.forEach((key, k) => {
        record[key] = textArr[k];
      });
    }
    return { ...record, ...(targetLng !== 'en' ? { language: targetLng } : {}) };
  } catch (err) {
    console.log('Translete error', JSON.stringify(err.message));
    return null;
  }
};

const getRecordTranslate = async (table = null, records = null, language = 'en') => {
  if (table && (records && records.length > 0) && language !== 'en') {
    const ids = records.map(item => item.id);
    const tableTr = `${table}_translate`;
    const existTable = await isTable(tableTr);
    if (!existTable) return records;
    const resultsTr = await db.knex(tableTr).whereRaw('id = ANY (?) AND language = ?', [`{"${ids.join('", "')}"}`, language]);
    if (resultsTr.length > 0) {
      return records.map(item => {
        const exist = resultsTr.find(tr => tr.id === item.id);
        if (!exist) return item;
        delete exist.language;
        return { ...item, ...exist };
      });
    }
  }
  return records;
};

const searchRecord = async (table, data) => {
  try {
    results = await db.knex(table).where((bd) => {
      Object.keys(data).forEach((key, k) => {
        if (k === 0) {
          bd.where({ [key]: data[key] });
        } else {
          bd.orWhere({ [key]: data[key] });
        }
      });
    });
    return results;
  } catch (err) {
    console.log('Search error', JSON.stringify(err.message));
    return null;
  }
};

const updateRecord = async (table, data, language, user, languages = null) => {
  const source = { ...data };

  try {
    if ((source.files || source.images) && table.includes('data_')) {
      const files = [...(source.files || []), ...(source.images || [])];
      if (files.length > 0) {
        await Promise.all(files.filter(f => f).map(async (item) => {
          const { base64, path } = item;
          const file = await commonUtils.fileWrite(path, base64);
          return file;
        }));
        MEDIA_KEYS.forEach(key => {
          if (source[key]) {
            source[key] = source[key].map((file) => (file && typeof file === 'object' ? file.uuid : file));
          }
        });
      }
    }
    
    // insert/update for table without translate
    if (!source.id) {
      const tableTr = `${table}_translate`;
      const existTable = await isTable(tableTr);
      const edited = { ...source };
      delete edited.id;
      
      // insert translate
      if (existTable && languages) {
        const filtredLng = languages.filter(f => f !== 'en' && f !== language);

        let createdEn = edited;
        if (language !== 'en') {
          createdEn = await translateRecord(edited, language, 'en');
        }
        [createdEn] = await db.knex(table).insert({ ...createdEn, change_user: user.id, change_at: new Date().toISOString() }).returning('*');
        source.id = createdEn.id;

        let resultsTr = await Promise.all(filtredLng.map(async (lng) => {
          const res = await translateRecord(source, language, lng);
          return res;
        }));
        results = source;
        resultsTr = await Promise.all([{ ...source, language }, ...resultsTr].map(async (obj) => {
          const editedObj = { ...obj };
          delete editedObj.language;
          const res = await updateRecordTr(table, editedObj, obj.language, user);
          return res;
        }));
       
        const indexLng = ['en', ...(language === 'en' ? [] : [language]), ...filtredLng].findIndex(lng => lng === language);
        results = [createdEn, ...resultsTr][indexLng];
      } else {
        [results] = await db.knex(table).insert(edited).returning('*');
      }

      // options create user roles for new restaurant
      if (table === 'data_restaurants') {
        await db.knex('data_roles').insert({
          user_id: user.id,
          access: ['owner', 'manager', 'employee', 'account', 'guest'],
          project: table,
          project_id: results.id,
          change_user: user.id,
        });
      }
    } else {
      // update table logs before update 
      logRecord(table, source.id);

      // update table with translate and return value
      const updateRes = await updateRecordTr(table, source, language, user);
      if (updateRes) return updateRes;
      
      // insert/update for table with translate
      if (table.indexOf('_translate') > -1) {
        const resultTrExist = await db.knex(table).where({ id: source.id, language });
        if (resultTrExist.length === 0) {
          [results] = await db.knex(table).insert({ ...source, change_user: user.id, change_at: new Date().toISOString() }).returning('*');
        }
      } else {
        // set logic select if langeage !== en
        const logicalTr = table.indexOf('_translate') > -1 && language !== 'en' ? { language } : {};
        [results] = await db.knex(table).where({ ...logicalTr, id: source.id }).update({ ...source, change_user: user.id, change_at: new Date().toISOString() }).returning('*');
      }
    }
    
    // socket emit change to client
    if ('restaurant' in results) {
      const type = !source.id ? 'create' : 'update';
      socket.emit({
        id: results.restaurant,
        data: results,
        type,
        table,
      });
    }
    
    return results;
  } catch (err) {
    console.log('Update error', JSON.stringify(err.message));
    return null;
  }
};

const updateRecordTr = async (table, source, language = 'en', user) => {
  if (language === 'en') return null;
  const dataTr = { ...source };
  const tableTr = `${table}_translate`;
  let modelTr = await getTableFields(tableTr);
  delete dataTr.images;
  delete dataTr.files;

  modelTr = Object.keys(modelTr).reduce((obj, key) => ({ ...obj, [key]: null }), {});
  const updateTr = updatedDiff(modelTr, dataTr);
  const updateEn = { ...addedDiff(updateTr, dataTr) };
  const [resultEn] = await db.knex(table).where({ id: source.id }).update({ ...updateEn, change_user: user.id, change_at: new Date().toISOString() }).returning('*');
  let [resultTr] = await db.knex(tableTr).where({ id: source.id, language }).update({ ...updateTr, change_user: user.id, change_at: new Date().toISOString() }).returning('*');
  if (!resultTr) {
    [resultTr] = await db.knex(tableTr).insert({
      ...updateTr, language, change_user: user.id, change_at: new Date().toISOString(), 
    }).returning('*');
  }
  delete resultTr.language;

  return { ...resultEn, ...resultTr };
};

module.exports = {
  isTable,
  getWordsPermit,
  getTableAll,
  getTables,
  getTableFields,
  getTableStats,
  logRecord,
  translateRecord,
  getRecordTranslate,
  searchRecord,
  updateRecord,
  updateRecordTr,
};
