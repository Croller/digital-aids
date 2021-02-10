const db = require('../services/db');
const commonUtils = require('../utils/common');
// const auth = require('../services/auth');

const error = {
  name: '',
  code: 0,
  text: '',
};

const CommonController = () => {
  // database method
  const getTableByNames = async (req, res) => {
    try {
      const { names } = req.body.data;
      const result = await Promise.all(names.map(async (name) => {
        const desc = await db.query(`SELECT * FROM ${name}`);
        return { [name]: desc.rows };
      }));
      res.json(result.reduce((obj, arr) => ({ ...obj, ...arr }), {}));
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const getTableRecord = async (req, res) => {
    try {
      const { id, name } = req.body.data;
      const result = await db.query(`SELECT * FROM ${name} WHERE id=${id}`);
      res.json(result.rows);
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const insertTableRecord = async (req, res) => {
    try {
      const { name, data } = req.body.data;
      const query = Object.keys(data).reduce((obj, key) => {
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
      res.json(record.rows[0]);
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const insertTableRecords = async (req, res) => {
    try {
      const { name, data } = req.body.data;
      if (data && data.length > 0) {
        const records = data.map(async (row) => {
          const query = Object.keys(row).reduce((obj, key) => {
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
        const query = Object.keys(data).reduce((arr, key) => {
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
          const query = Object.keys(row).reduce((obj, key) => {
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
  const getFile = async (req, res) => {
    try {
      const { path } = req.body.data;
      const data = await commonUtils.readFile(path);
      if (path.indexOf('json') > -1) {
        res.json(data);
      }
    } catch (err) {
      error.name = 'Read file error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const updateInfoFile = async (req, res) => {
    try {
      const { path, info } = req.body.data;
      await commonUtils.writeFile(path, info);
      res.json({});
    } catch (err) {
      error.name = 'Read file error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const uploadFile = async (req, res) => {
    try {
      const { path, json } = req.body.data;
      const data = await commonUtils.readFile(path, json || false);
      res.json(data);
    } catch (err) {
      error.name = 'Read file error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  return {
    getTableByNames,
    getTableRecord,
    insertTableRecord,
    insertTableRecords,
    updateTableRecord,
    deleteTableRecords,
    deleteTable,
    updateTable,

    getFile,
    updateInfoFile,
    uploadFile,
  };
};

export default CommonController;
