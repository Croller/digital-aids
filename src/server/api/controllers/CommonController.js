const db = require('../services/db');
const jwt = require('../services/jwt');
const commonUtils = require('../utils/common');

const error = {
  code: 0,
  name: '',
  text: '',
};

const CommonController = () => {
  let query = '';
  let values = [];
  
  const getTableByNames = async (req, res) => {
    try {
      const tokenData = await jwt.verifyToken(req, res);
      if (tokenData) {
        const { names } = req.body;
        const result = await Promise.all(names.map(async (name) => {
          const desc = await db.query(`SELECT * FROM ${name}`);
          return { [name]: desc.rows };
        }));
        res.json(result.reduce((obj, arr) => ({ ...obj, ...arr }), {}));
      } else {
        error.name = 'Token not valid';
        error.code = 'tokenNotValid';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.code = 'queryError';
      error.text = JSON.stringify(err);
      res.status(201);
      res.json({ error });
    }
  };

  const getTableRecord = async (req, res) => {
    try {
      const tokenData = await jwt.verifyToken(req, res);
      if (tokenData) {
        const { id, name } = req.body;
        query = `SELECT * FROM ${name} WHERE id=($1)`;
        values = [id];
        const result = await db.queryValues(query, values);
        res.json(result.rows);
      } else {
        error.name = 'Token not valid';
        error.code = 'tokenNotValid';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const getTableRecords = async (req, res) => {
    try {
      const tokenData = await jwt.verifyToken(req, res);
      if (tokenData) {
        const { ids, name } = req.body;
        query = `SELECT * FROM ${name} WHERE id = ANY ($1)`;
        values = [ids];
        const result = await db.queryValues(query, values);
        res.json(result.rows);
      } else {
        error.name = 'Token not valid';
        error.code = 'tokenNotValid';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const createTableRecord = async (req, res) => {
    try {
      const { name } = req.params;
      const tokenData = await jwt.verifyToken(req, res);
      if (tokenData.roles.some(r => [1, 2].includes(r))) {
        const data = req.body;
        delete data.id;
        const mapper = Object.keys(data).reduce((obj, key) => {
          if (key === 'images') {
            return {
              fields: [...obj.fields, key],
              values: [...obj.values, data[key].map((image) => image.uuid)],
            };
          }
          return {
            fields: [...obj.fields, key],
            values: [...obj.values, data[key]],
          };
        }, { fields: [], values: [] });

        await Promise.all(data.images.map(async (image) => {
          const { base64, path } = image;
          const file = await commonUtils.writeFile(path, base64);
          return file;
        }));

        query = `INSERT INTO ${name} (${mapper.fields.join(', ')}) VALUES (${mapper.fields.map((key, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
        const result = await db.queryValues(query, mapper.values);
        res.json(result.rows[0]);
      } else {
        error.name = 'Token not valid';
        error.code = 'tokenNotValid';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Not enough rights';
      error.code = 'notEnoughRights';
      error.text = JSON.stringify(err);
      res.status(201);
      res.json({ error });
    }
  };

  const insertTableRecords = async (req, res) => {
    try {
      const { name, data } = req.body;
      if (data && data.length > 0) {
        const records = data.map(async (row) => {
          query = Object.keys(row).reduce((obj, key) => {
            let value = data[key];
            if (!value || (value && Array.isArray(value) && value.length === 0)) {
              return obj;
            }
            if (Array.isArray(value)) {
              value = `{${value.join('\', \'')}}`;
            }
            return {
              fields: [...obj.fields, key],
              values: [...obj.values, value],
            };
          }, { fields: [], values: [] });
          const record = await db.query(`INSERT INTO ${name} (${query.fields.join(', ')}) VALUES ('${query.values.join('\', \'').replace(/''/g, 'NULL')}') RETURNING *`);
          return record;
        });
        res.json(records);
      } else {  
        error.name = 'Data empty';
        error.text = '';
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const updateTableRecord = async (req, res) => {
    try {
      const { name, data } = req.body.data;
      const { id } = { ...data };
      const check = await db.query(`SELECT * FROM ${name} WHERE id='${id}'`);
      if (check.rows.length === 1) {
        delete data.id;
        query = Object.keys(data).reduce((arr, key) => {
          const value = data[key];
          if (value === null || (Array.isArray(value) && value.length === 0)) {
            return arr;
          }
          if (Array.isArray(value)) {
            return [...arr, `${key}='{"${value.join('", "')}"}'`];
          }
          return [...arr, `${key}='${value}'`];
        }, []);
        const upadateUser = await db.query(`UPDATE ${name} SET ${query.join(', ')} WHERE id='${id}' RETURNING *`);
        res.json(upadateUser.rows[0]);
      } else {
        error.name = 'Update record error';
        error.text = 'This record does not exist';
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const updateTable = async (req, res) => {
    try {
      const { name, data } = req.body.data;
      await db.query(`TRUNCATE ${name} RESTART IDENTITY`);
      if (data && data.length > 0) {
        data.map(async (row) => {
          query = Object.keys(row).reduce((obj, key) => {
            if (key !== 'id' && row[key]) {
              return {
                fields: [...obj.fields, key],
                values: [...obj.values, row[key]],
              };
            }
            return obj;
          }, { fields: [], values: [] });
          const record = await db.query(`INSERT INTO ${name} (${query.fields.join(', ')}) VALUES ('${query.values.join('\', \'').replace(/''/g, 'NULL')}') RETURNING *`);
          return record;
        });
        const results = await db.query(`SELECT * FROM ${name}`);
        res.json(results.rows);
      } else {  
        error.name = 'Data empty';
        error.text = '';
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const deleteTableRecords = async (req, res) => {
    try {
      const { name } = req.body.data;
      await db.query(`TRUNCATE ${name} RESTART IDENTITY`);
      res.json({});
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const deleteTable = async (req, res) => {
    try {
      const { name } = req.body.data;
      await db.query(`DROP TABLE ${name}`);
      res.json({});
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  // file method

  return {
    getTableByNames,

    getTableRecord,
    getTableRecords,

    createTableRecord,

    insertTableRecords,
    updateTableRecord,
    deleteTableRecords,
    deleteTable,
    updateTable,
  };
};

export default CommonController;
