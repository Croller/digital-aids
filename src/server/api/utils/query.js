const { addedDiff, updatedDiff } = require('deep-object-diff');
const moment = require('moment');
const db = require('../services/db');
const socket = require('../services/socket');
const commonUtils = require('./common');

const error = {
  code: 0,
  name: '',
  text: '',
};

let query = '';
let values = [];
let result = {};

const Query = () => {
  const mapFields = (type) => {
    const typeEdit = type.replace(/ /g, '_').toLowerCase();
    const mapper = {
      integer: { type: 'number', value: 0 },
      double_precision: { type: 'float', value: 0.0 },
      uuid: { type: 'string', value: '' },
      character_varying: { type: 'string', value: '' },
      jsonb: { type: 'object', value: {} },
      boolean: { type: 'boolean', value: false },
      array: { type: 'array', value: [] },
      timestamp_with_time_zone: { type: 'datetime', value: moment() },
    };
    return mapper[typeEdit];
  };

  const checkTable = async (table = null) => {
    result = await db.query(`SELECT * FROM information_schema.tables WHERE table_name = '${table}'`);
    if (result.rows.length === 0) return false;
    return true;
  };

  const getTableFields = async (table) => {
    result = await db.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${table}'`);
    if (result.rows.length === 0) return null;
    return result.rows.reduce((obj, { column_name, data_type }) => ({ ...obj, [column_name]: mapFields(data_type) }), {});
  };  

  const updateTableRecord = async (table, data, params) => {
    const source = { ...data };
    const { res, user, language = 'en' } = params;
    const fieldsTable = await getTableFields(table);
    try {
      const mapper = Object.keys(source)
        .filter(f => (['_translate'].some(s => table.includes(s)) ? f : f !== 'id'))
        .reduce((obj, key) => {
          if (key === 'images') {
            return {
              fields: [...obj.fields, key],
              values: [...obj.values, (source[key] ? source[key].map((image) => (image ? image.uuid : null)) : null)],
            };
          }
          if (fieldsTable[key] && fieldsTable[key].type === 'object') {
            return {
              fields: [...obj.fields, key],
              values: [...obj.values, JSON.stringify(source[key])],
            };
          }
          return {
            fields: [...obj.fields, key],
            values: [...obj.values, source[key]],
          };
        }, { fields: [], values: [] });

      if (source.images && table.includes('data_')) {
        await Promise.all(source.images.filter(f => f).map(async (image) => {
          const { base64, path } = image;
          const file = await commonUtils.fileWrite(path, base64);
          return file;
        }));
      }
      // update table with translate
      if (['data_categories', 'data_dishes'].includes(table) && language !== 'en') {
        let tr_model = await getTableFields(`${table}_translate`);
        tr_model = Object.keys(tr_model).reduce((obj, key) => ({ ...obj, [key]: null }), {});
        const tr_data = { ...source };
        delete tr_data.images;

        let updateTR = updatedDiff(tr_model, tr_data);
        let updateEN = { id: source.id, ...addedDiff(updateTR, tr_data) };
        updateTR = await updateTableRecord(`${table}_translate`, { ...updateTR, language }, params);
        updateEN = await updateTableRecord(table, updateEN, { res, user, language: 'en' });
        delete updateTR.language;

        return { ...updateEN, ...updateTR };
      }
    
      result = {};
      // insert/update for table without translate
      if (!source.id) {
        query = `INSERT INTO ${table} (${mapper.fields.join(', ')}) VALUES (${mapper.fields.map((key, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
        result = await db.queryValues(query, mapper.values);

        // options create user roles for new restaurant
        if (table === 'data_restaurants') {
          query = 'INSERT INTO data_roles (user_id, restaurant, owner, manager, employee) VALUES ($1, $2, TRUE, TRUE, TRUE) RETURNING *';
          values = [user.id, result.rows[0].id];
          await db.queryValues(query, values);
        }
      } else {
      // update table logs before update 
        if (table.indexOf('data_') > -1) {
          const logsTable = table.replace('data_', 'logs_');
          const existTable = await checkTable(logsTable);
          if (existTable) {
            await db.query(`INSERT INTO ${logsTable} (SELECT * FROM ${table} WHERE id='${source.id}')`);
            await db.query(`UPDATE ${logsTable} SET change_at='${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}', change_user='${user.id}' WHERE id='${source.id}'`);
          }
        }
        // insert/update for table with translate
        if (table.indexOf('_translate') > -1) {
          result = await getTableRecord(table, { id: source.id, language }, params);
          query = `UPDATE ${table} SET ${mapper.fields.map((filed, f) => `${filed}=$${f + 2}`).join(', ')} WHERE id=$1 ${language !== 'en' ? `AND language = '${language}'` : ''} RETURNING *`;
          values = [source.id, ...mapper.values];
          if (result.length === 0) {
            query = `INSERT INTO ${table} (${mapper.fields.join(', ')}) VALUES (${mapper.fields.map((key, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
            values = [...mapper.values];
          }
        } else {
          query = `UPDATE ${table} SET ${mapper.fields.map((filed, f) => `${filed}=$${f + 2}`).join(', ')} WHERE id=$1 ${language !== 'en' ? `AND language = '${language}'` : ''} RETURNING *`;
          values = [source.id, ...mapper.values];
        }
        result = await db.queryValues(query, values);
      }

      // socket emit change to client
      if ('restaurant' in result.rows[0]) {
        const { restaurant } = result.rows[0];
        socket.emit({
          type: !source.id ? 'create' : 'update',
          id: restaurant,
          table,
          data: result.rows[0],
        });
      }

      return result.rows[0];
    } catch (err) {
      error.name = 'Query error';
      error.code = 'queryError';
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  };

  const getTableRecord = async (table, data, params) => {
    const { res } = params;
    try {
      const queryStr = Object.keys(data).map((key, k) => {
        if (data[key] && Array.isArray(data[key])) {
          return `${key} = ANY ($${k + 1})`;
        }
        return `${key}=($${k + 1})`;
      }).join(' AND ');
      query = `SELECT * FROM ${table} WHERE ${queryStr}`;
      values = Object.keys(data).map(key => data[key]);
      result = await db.queryValues(query, values);
      return result.rows;
    } catch (err) {
      error.name = 'Query error';
      error.code = 'queryError';
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  };

  return {
    mapFields,
    checkTable,
    getTableFields,
    updateTableRecord,
    getTableRecord,
  };
};

module.exports = Query;
