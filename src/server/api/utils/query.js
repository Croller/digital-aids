const { addedDiff, updatedDiff } = require('deep-object-diff');
const db = require('../services/db');
const socket = require('../services/socket');
const commonUtils = require('../utils/common');

const error = {
  code: 0,
  name: '',
  text: '',
};

let query = '';
let values = [];
let results = {};

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

const getTableBase = async () => {
  results = await db.query('SELECT * FROM information_schema.tables');
  if (results.rows.length === 0) return null;
  return results.rows;
};

const checkTable = async (table = null) => {
  query = 'SELECT * FROM information_schema.tables WHERE table_name = $1';
  values = [table];
  results = await db.queryValues(query, values);
  if (results.rows.length === 0) return false;
  return true;
};

const getTableFields = async (table) => {
  query = 'SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1';
  values = [table];
  results = await db.queryValues(query, values);
  if (results.rows.length === 0) return null;
  return results.rows.reduce((obj, { column_name, data_type }) => ({ ...obj, [column_name]: mapFields(data_type) }), {});
};

const getTableStats = async (table, params) => {
  const { res } = params;
  try {
    const fieldsTable = await getTableFields(table);
    results = await Promise.all(Object.keys(fieldsTable).map(async (key) => {
      query = `SELECT ${key} FROM ${table} GROUP BY ${key}`;
      const promise = await db.query(query);
      return promise;
    }));
    results = results.reduce((obj, result) => {
      const key = Object.keys(result.rows[0])[0];
      return { ...obj, [key]: result.rows.map(row => row[key]) };
    }, {});
    return results;
  } catch (err) {
    error.name = 'Query error';
    error.code = 'queryError';
    error.text = JSON.stringify(err.message);
    res.status(201);
    res.json({ error });
  }
};

const searchTableRecord = async (table, data, params) => {
  const { res } = params;
  const logical = data.settings && data.settings.search ? 'OR' : 'AND';
  const mapping = data.settings && !!data.settings.view;
  const paging = data.settings && data.settings.page_length && data.settings.page;
  const sorting = data.settings && data.settings.order_by;
  
  try {
    const fieldsTable = await getTableFields(table);

    let where = Object.keys(data).reduce((arr, key) => {
      const keyEdited = key.replace('_from', '').replace('_to', '');
      if (!data[keyEdited] || (data[keyEdited] && data[keyEdited].length === 0) || !fieldsTable[keyEdited]) return arr;
      const { type } = fieldsTable[keyEdited];
      let str = `${table}.${key} = ${data[key]}`;

      if (['number', 'float'].some(s => s === type)) {
        let value = !isNaN(data[key]) ? parseInt(data[key], 0) : data[key];
        if (type === 'float') {
          value = !isNaN(data[key]) ? parseFloat(data[key]) : data[key];
        }
        
        str = `${table}.${keyEdited} = ${value}`;
        if (Array.isArray(value)) {
          str = `${key} = ANY ('{"${value.join('", "')}"}')`;
          // if (value.length === 1) {
          //   str = `${table}.${keyEdited} >= ${value}`;
          // }
          // if (value.length === 2) {
          //   str = `${table}.${keyEdited} BETWEEN ${value[0]} AND ${value[1]}`; // fix search at array
          // }
        }
        if (['_from', '_to'].some(s => key.indexOf(s) > -1)) {
          if (data[`${table}.${keyEdited}_from`] && !data[`${table}.${keyEdited}_to`]) {
            str = `${table}.${keyEdited} >= ${value}`;
          }
          if (data[`${table}.${keyEdited}_to`] && !data[`${table}.${keyEdited}_from`]) {
            str = `${table}.${keyEdited} <= ${value}`;
          }
          if (data[`${table}.${keyEdited}_from`] && data[`${table}.${keyEdited}_to`]) {
            str = `${table}.${keyEdited} BETWEEN '${data[`${table}.${keyEdited}_from`]}' AND '${data[`${table}.${keyEdited}_to`]}'`;
          }
        }
      }
      if (type === 'string') {
        if (Array.isArray(data[key])) {
          str = `${table}.${keyEdited} = ANY ('{"${data[key].join('", "')}"}')`;
        } else if (logical) {
          str = `LOWER(${table}.${keyEdited}) LIKE '%' || LOWER('${data[key]}') || '%'`;
        } else {
          str = `${key} = '${data[key]}'`;
        }
      }
      if (type === 'array') {
        if (Array.isArray(data[keyEdited])) {
          str = `${table}.${keyEdited} @> '{"${data[key].join('", "')}"}'`;
        } else {
          str = `${table}.${keyEdited} @> '{"${data[key]}"}'`;
        }
      }
      if (type === 'datetime') {
        str = `${key} = '${data[key]}'`;
        if (['_from', '_to'].some(s => key.indexOf(s) > -1)) {
          if (data[`${table}.${keyEdited}_from`] && !data[`${table}.${keyEdited}_to`]) {
            str = `${table}.${keyEdited} >= '${data[key]}'`;
          }
          if (data[`${table}.${keyEdited}_to`] && !data[`${table}.${keyEdited}_from`]) {
            str = `${table}.${keyEdited} <= '${data[key]}'`;
          }
          if (data[`${table}.${keyEdited}_from`] && data[`${table}.${keyEdited}_to`]) {
            str = `${table}.${keyEdited} BETWEEN '${data[`${table}.${keyEdited}_from`]}' AND '${data[`${table}.${keyEdited}_to`]}'`;
          }
        }
      }
      if (type === 'object') {
        if (logical) {
          str = `LOWER(${table}.${keyEdited}::text) LIKE '%' || LOWER('${data[key]}') || '%'`;
        } else {
          str = `${key} = '${data[key]}'`;
        }
      }
      return [...arr, str];
    }, []);

    // view, join fields where name start with "id_"
    let mapper = '';
    let join = '';
    const keys = Object.keys(fieldsTable).filter(f => f.indexOf('id_') > -1 && fieldsTable[f].type === 'string');
    if (mapping && keys.length > 0) {
      mapper = ['', ...keys.map(key => {
        const nameTable = key.replace('id_', 'data_');
        return `row_to_json(${nameTable}.*) as ${key.replace('id_', 'item_')}`;
      })].join(', ');
      join = keys.map(key => {
        const nameTable = key.replace('id_', 'data_');
        return `LEFT JOIN ${nameTable} ON ${table}.${key}::text = ${nameTable}.id::text`;
      }).join(', ');
    }

    // order, data sort by field and way
    let sorter = '';
    if (sorting) {
      const { order_by } = data.settings;
      const strArr = Object.keys(order_by).map(key => {
        const keyEdited = key.indexOf('.') === -1 ? `${table}.${key}` : key;
        const way = order_by[key] === 'asc' ? 'ASC' : 'DESC';
        return `${keyEdited} ${way}`;
      });
      sorter = `ORDER BY ${strArr.join(', ')}`;
    }

    // where
    where = where.length > 0 ? `WHERE ((${where.join(`) ${logical} (`)}))` : '';

    query = `SELECT ${table}.* ${mapper} FROM ${table} ${join} ${where} ${sorter}`;

    // TODO edit offset at query to db
    const result = await db.query(query);
    let resp = {
      features: result.rows,
      page: 1,
      pages: 1,
      total: result.rows.length,
    };

    // paging response
    if (paging) {
      const { page, page_length } = data.settings;
      const pages = result.rows.length / page_length;
      resp = {
        ...resp,
        features: result.rows.slice((page - 1) * page_length, page * page_length),
        page,
        pages: pages > 0 && pages < 1 ? 1 : Math.floor(pages) + 1,
      };
    }
    return resp;
  } catch (err) {
    error.name = 'Query error';
    error.code = 'queryError';
    error.text = JSON.stringify(err.message);
    res.status(201);
    res.json({ error });
  }
};

const updateTableRecord = async (table, data, params) => {
  const source = { ...data };
  const { res, user, language = 'en' } = params;
  const fieldsTable = await getTableFields(table);
  if (fieldsTable && fieldsTable.change_user && table.includes('data_')) {
    source.change_user = user.id;
  }
  try {
    const mapper = Object.keys(source)
      .filter(f => (table.indexOf('logs_') > -1 ? f : !['id'].some(k => f === k)))
      .reduce((obj, key) => {
        if (!fieldsTable[key]) return obj;
        if (source[key] === null || (source[key] && source[key].length === 0) || source[key] === undefined) {
          return {
            fields: [...obj.fields, key],
            values: [...obj.values, null],
          };
        }
        if (['images', 'files'].includes(key)) {
          return {
            fields: [...obj.fields, key],
            values: [...obj.values, (source[key] ? source[key].map((file) => (file && typeof file === 'object' ? file.uuid : file)) : null)],
          };
        }
        if (fieldsTable[key].type === 'object') {
          return {
            fields: [...obj.fields, key],
            values: [...obj.values, JSON.stringify(source[key])],
          };
        }
        if (fieldsTable[key].type === 'number') {
          const val = typeof source[key] === 'string' && !isNaN(source[key]) ? parseInt(source[key], 0) : fieldsTable[key].value;
          if (isNaN(val)) return obj;
          return {
            fields: [...obj.fields, key],
            values: [...obj.values, val],
          };
        }
        if (fieldsTable[key].type === 'float') {
          const val = typeof source[key] === 'string' && !isNaN(source[key]) ? parseFloat(source[key]) : fieldsTable[key].value;
          if (isNaN(val)) return obj;
          return {
            fields: [...obj.fields, key],
            values: [...obj.values, val],
          };
        }
        if (fieldsTable[key].type === 'array') {
          const type = source[key] && Array.isArray(source[key]) ? source[key].reduce((t, value) => (isNaN(Number(value)) && t === 'string' ? 'string' : 'number'), 'string') : 'string';
          return {
            fields: [...obj.fields, key],
            values: [...obj.values, Array.isArray(source[key]) ? type === 'string' ? `{"${source[key].split('|').join('", "')}"}` : `{${source[key].join(', ')}}` : `{${type === 'string' ? `"${source[key]}"` : source[key]}}`],
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
    if (source.files) {
      await Promise.all(source.files.filter(f => f).map(async (item) => {
        const { base64, path } = item;
        const file = await commonUtils.fileWrite(path, base64);
        return file;
      }));
    }
    
    results = {};
    // insert/update for table without translate
    if (!source.id) {
      query = `INSERT INTO ${table} (${mapper.fields.join(', ')}) VALUES (${mapper.fields.map((key, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
      results = await db.queryValues(query, mapper.values);

      // options create user roles for new restaurant
      if (table === 'data_restaurants') {
        query = 'INSERT INTO data_roles (user_id, project, access) VALUES ($1, $2, $3) RETURNING *';
        values = [user.id, table, '{"owner", "manager", "employee", "account", "guest"}'];
        await db.queryValues(query, values);
      }
    } else {
      // update table logs before update 
      if (table.indexOf('data_') > -1) {
        const logsTable = table.replace('data_', 'logs_');
        const existTable = await checkTable(logsTable);
        if (existTable) {
          await db.query(`INSERT INTO ${logsTable} (SELECT * FROM ${table} WHERE id='${source.id}')`);
        }
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
      // insert/update for table with translate
      if (table.indexOf('_translate') > -1) {
        const resultTrExist = await getTableRecord(table, { id: source.id, language }, params);
        if (resultTrExist.length === 0) {
          query = `INSERT INTO ${table} (id, ${mapper.fields.join(', ')}) VALUES ($1, ${mapper.fields.map((key, i) => `$${i + 2}`).join(', ')}) RETURNING *`;
          values = [source.id, ...mapper.values];
        }
      } else {
        // set logic select if langeage !== en
        const logicalTr = table.indexOf('_translate') > -1 && language !== 'en' ? `AND language = '${language}'` : '';
        query = `UPDATE ${table} SET ${mapper.fields.map((filed, f) => `${filed}=$${f + 2}`).join(', ')} WHERE id=$1 ${logicalTr} RETURNING *`;
        values = [source.id, ...mapper.values];
      }
      results = await db.queryValues(query, values);
    }
    
    // socket emit change to client
    if ('restaurant' in results.rows[0]) {
      socket.emit({
        type: !source.id ? 'create' : 'update',
        id: results.rows[0].restaurant,
        table,
        data: results.rows[0],
      });
    }
    
    return results.rows[0];
  } catch (err) {
    error.name = 'Query error';
    error.id = 'queryError';
    error.query = { query, values };
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
    results = await db.queryValues(query, values);
    return results.rows;
  } catch (err) {
    error.name = 'Query error';
    error.id = 'queryError';
    error.text = JSON.stringify(err.message);
    res.status(201);
    res.json({ error });
  }
};

module.exports = {
  getTableBase,
  checkTable,
  getTableFields,
  getTableStats,
  searchTableRecord,
  updateTableRecord,
  getTableRecord,
};
