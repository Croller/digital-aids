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
    results = await Promise.allSettled(Object.keys(fieldsTable).map(async (key) => {
      const group = await db.knex(table).select(key).groupBy(key);
      return group;
    }));
    return results.reduce((obj, { value }) => {
      const key = Object.keys(value[0])[0];
      const values = value.reduce((arr, row) => {
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

const translateRecord = async (record = null, sourceLng = 'en', targetLng = 'en') => {
  if (!record || sourceLng === targetLng) return null;
  try {
    const separator = ' || ';
    const source = { ...record };
    const keysTr = TRANSLATE_KEYS.filter(key => record[key] && key);
    const arrTr = keysTr.map(key => record[key]);
    if (!arrTr || (arrTr && arrTr.length === 0)) return null;

    const text = arrTr.length > 1 ? arrTr.join(separator) : arrTr[0];
    const resultsTr = await google.getTextTranslate({ text, sourceLng, targetLng });
    if (resultsTr.error) return null;

    if (arrTr.length === 1) {
      source[keysTr[0]] = resultsTr[0].translatedText;
    } else {
      const textArr = resultsTr[0].translatedText.split(separator);
      keysTr.forEach((key, k) => {
        source[key] = textArr[k];
      });
    }
    return source;
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
      const existTable = await isTable(`${table}_translate`);
      const edited = { ...source };
      delete edited.id;

      if (existTable && language !== 'en' && languages) {
        let resultsTr = await Promise.all(languages.map(async (lng) => {
          const res = await translateRecord(source, language, lng);
          return res;
        }));
        const arrTrFilter = resultsTr.reduce((obj, result, r) => (result ? { items: [...obj.items, result], lng: [...obj.lng, languages[r]] } : obj), { items: [], lng: [] });
        
        const updatedEn = await updateRecordTr(table, arrTrFilter.items.shift(), arrTrFilter.lng.shift(), user);
        resultsTr = await Promise.all(arrTrFilter.items.map(async (obj, o) => {
          const res = await updateRecordTr(table, { ...obj, id: updatedEn.id }, arrTrFilter.lng[o], user);
          return res;
        }));
        console.log('updateRecordTr', { ...resultsTr });
          
        results = results.map(({ value }) => value);
        console.log('results translate', results);

        results = results[language];
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
      const updateRes = updateRecordTr(table, source, language, user);
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
      socket.emit({
        type: !source.id ? 'create' : 'update',
        id: results.restaurant,
        table,
        data: results,
      });
    }
    
    return results;
  } catch (err) {
    console.log('Update error', JSON.stringify(err.message));
    return null;
  }
};

const updateRecordTr = async (table, source, language, user) => {
  if (language === 'en') {
    const updateEn = await updateRecord(table, source, language, user);
    return updateEn;
  } 
  const tableTr = `${table}_translate`;
  let modelTr = await getTableFields(tableTr);

  modelTr = Object.keys(modelTr).reduce((obj, key) => ({ ...obj, [key]: null }), {});
  const dataTr = { ...source };
  delete dataTr.images;
  delete dataTr.files;

  let updateTr = updatedDiff(modelTr, dataTr);
  let updateEn = { ...source, ...addedDiff(updateTr, dataTr) };
  updateEn = await updateRecord(table, updateEn, language, user);
  updateTr = await updateRecord(tableTr, { id: source.id || updateEn.id, ...updateTr, language }, language, user);
  delete updateTr.language;

  return { ...updateEn, ...updateTr };
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
