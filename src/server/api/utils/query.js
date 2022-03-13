/* eslint-disable no-console */
const { addedDiff, updatedDiff } = require('deep-object-diff');
const db = require('../services/db');
const socket = require('../services/socket');
const commonUtils = require('../utils/common');

let results = [];

const getTableAll = async () => {
  results = await db.knex('information_schema.tables').select();
  return results;
};

const getTables = async (names, options = {}) => {
  results = await Promise.all(names.map(async (name) => {
    const result = await db.knex(name).where({ ...options });
    return { [name]: result }; 
  }));
  return results.reduce((obj, arr) => ({ ...obj, ...arr }), {});
};

const getWordsPermit = async () => {
  results = await db.knex('pg_get_keywords()').select();
  return results;
};

const getTableFields = async (table) => {
  results = await existTable(table);

  if (!results) return null;
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

const existTable = async (table = null) => {
  results = await db.knex('information_schema.tables').where({ table_name: table });
  return results.length !== 0;
};

const logRecord = async (table, id) => {
  if (table.indexOf('data_') > -1) {
    const logsTable = table.replace('data_', 'logs_');
    const filtred = await db.knex(table).where({ id });
    const existT = await existTable(logsTable);
    if (existT && filtred.length === 1) {
      await db.knex(logsTable).insert(filtred[0]);
      return true;
    }
  }
  return false;
};

const getRecordTranslate = async (table = null, records = null, language = 'en') => {
  if (table && (records && records.length > 0) && language !== 'en') {
    const tableTr = `${table}_translate`;
    const ids = records.map(item => item.id);
    const existT = await existTable(tableTr);
    if (!existT) return records;

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
  return mapper[typeEdit];
};

const updateRecord = async (table, data, language, user) => {
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
        ['files', 'images'].forEach(key => {
          if (source[key]) {
            source[key] = source[key].map((file) => (file && typeof file === 'object' ? file.uuid : file));
          }
        });
      }
    }
    
    // insert/update for table without translate
    if (!source.id) {
      const edited = { ...source };
      delete edited.id;
      [results] = await db.knex(table).insert({ ...edited, change_user: user.id }).returning('*');

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
      
      // update table with translate
      if (['data_categories', 'data_dishes'].includes(table) && language !== 'en') {
        let tr_model = await getTableFields(`${table}_translate`);
        tr_model = Object.keys(tr_model).reduce((obj, key) => ({ ...obj, [key]: null }), {});
        const tr_data = { ...source };
        delete tr_data.images;

        let updateTR = updatedDiff(tr_model, tr_data);
        let updateEN = { id: source.id, ...addedDiff(updateTR, tr_data) };
        updateTR = await updateRecord(`${table}_translate`, { ...updateTR, language }, language, user);
        updateEN = await updateRecord(table, updateEN, language, user);
        delete updateTR.language;

        return { ...updateEN, ...updateTR };
      }
      
      // insert/update for table with translate
      if (table.indexOf('_translate') > -1) {
        const resultTrExist = await db.knex(table).where({ id: source.id, language });
        if (resultTrExist.length === 0) {
          [results] = await db.knex(table).insert(source).returning('*');
        }
      } else {
        // set logic select if langeage !== en
        const logicalTr = table.indexOf('_translate') > -1 && language !== 'en' ? { language } : {};
        [results] = await db.knex(table).where({ ...logicalTr, id: source.id }).update(source).returning('*');
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

module.exports = {
  getTableAll,
  getTables,
  getWordsPermit,
  getTableFields,
  getTableStats,
  existTable,
  logRecord,
  getRecordTranslate,
  searchRecord,
  updateRecord,
};
