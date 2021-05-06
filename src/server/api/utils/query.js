const {
  diff, addedDiff, deletedDiff, detailedDiff, updatedDiff, 
} = require('deep-object-diff');

const db = require('../services/db');
const commonUtils = require('../utils/common');

const error = {
  code: 0,
  name: '',
  text: '',
};

let query = '';
let values = [];

const mapFields = (type) => {
  const typeEdit = type.replace(/ /g, '_');
  const mapper = {
    integer: { type: 'number', value: 0 },
    double_precision: { type: 'float', value: 0.0 },
    uuid: { type: 'string', value: '' },
    character_varying: { type: 'string', value: '' },
    jsonb: { type: 'object', value: {} },
    boolean: { type: 'boolean', value: false },
    ARRAY: { type: 'array', value: [] },
  };
  return mapper[typeEdit];
};

const getTableFields = async (table) => {
  query = 'SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1';
  values = [table];
  const result = await db.queryValues(query, values);

  if (result.rows.length === 0) {
    return null;
  }
  return result.rows.reduce((obj, { column_name, data_type }) => ({ ...obj, [column_name]: mapFields(data_type) }), {});
};

const updateTableRecord = async (table, data, params) => {
  const { res, user, language } = params;
  const { login, password, restaurants } = user;
  const fieldsTable = await getTableFields(table);
  try {
    const mapper = (table.indexOf('translate') > -1 ? Object.keys(data) : Object.keys(data).filter(f => f !== 'id')).reduce((obj, key) => {
      if (key === 'images') {
        return {
          fields: [...obj.fields, key],
          values: [...obj.values, (data[key] ? data[key].map((image) => (image ? image.uuid : null)) : null)],
        };
      }
      if (fieldsTable[key].type === 'object') {
        return {
          fields: [...obj.fields, key],
          values: [...obj.values, JSON.stringify(data[key])],
        };
      }
      return {
        fields: [...obj.fields, key],
        values: [...obj.values, data[key]],
      };
    }, { fields: [], values: [] });

    if (data.images) {
      await Promise.all(data.images.filter(f => f).map(async (image) => {
        const { base64, path } = image;
        const file = await commonUtils.writeFile(path, base64);
        return file;
      }));
    }

    let result = {};

    // update table with translate
    if (['data_categories', 'data_dishes'].includes(table) && language !== 'en') {
      const tr_model = await getTableFields(`${table}_translate`);
      const tr_data = { ...data };
      delete tr_data.images;

      let updateTR = updatedDiff(tr_model, tr_data);
      let updateEN = { id: data.id, ...addedDiff(updateTR, tr_data) };
      updateTR = await updateTableRecord(`${table}_translate`, { ...updateTR, language }, params);
      updateEN = await updateTableRecord(table, updateEN, { res, user, language: 'en' });
      delete updateTR.language;

      return { ...updateEN, ...updateTR };
    }
    
    // insert/update for table without translate
    if (!data.id) {
      query = `INSERT INTO ${table} (${mapper.fields.join(', ')}) VALUES (${mapper.fields.map((key, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
      result = await db.queryValues(query, mapper.values);

      // options added to users, restaurants created
      if (table === 'data_restaurants') {
        query = 'UPDATE data_users SET restaurants=$1 WHERE login=$2 AND password=$3';
        values = [[...(restaurants || []), result.rows[0].id], login, password];
        await db.queryValues(query, values);
      }
    } else {
      query = `UPDATE ${table} SET ${mapper.fields.map((filed, f) => `${filed}=$${f + 2}`).join(', ')} WHERE id=$1 RETURNING *`;
      values = [data.id, ...mapper.values];

      // insert/update for table with translate
      if (table.indexOf('translate') > -1) {
        const results = await getTableRecord(table, { id: data.id }, params);
        query = `UPDATE ${table} SET ${mapper.fields.map((filed, f) => `${filed}=$${f + 2}`).join(', ')} WHERE id=$1 RETURNING *`;
        values = [data.id, ...mapper.values];
        if (results.length === 0) {
          query = `INSERT INTO ${table} (${mapper.fields.join(', ')}) VALUES (${mapper.fields.map((key, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
          values = [...mapper.values];
        }
      }

      result = await db.queryValues(query, values);
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
    const result = await db.queryValues(query, values);
    return result.rows;
  } catch (err) {
    error.name = 'Query error';
    error.code = 'queryError';
    error.text = JSON.stringify(err.message);
    res.status(201);
    res.json({ error });
  }
};

module.exports = {
  getTableFields,
  updateTableRecord,
  getTableRecord,
};
