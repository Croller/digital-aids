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
        const { names } = req.query;
        const result = await Promise.all(names.split(',').map(async (name) => {
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
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  };

  const getTableRecord = async (req, res) => {
    try {
      const tokenData = await jwt.verifyToken(req, res);
      if (tokenData) {
        const { name } = req.params;
        const { id } = req.body;
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
      error.text = JSON.stringify(err.message);
      res.json({ error });
    }
  };

  const getTableRecords = async (req, res) => {
    try {
      const tokenData = await jwt.verifyToken(req, res);
      if (tokenData) {
        try {
          const { name } = req.params;
          const { ids } = req.query;
          query = `SELECT * FROM ${name} WHERE id = ANY ($1)`;
          values = [ids.split(',')];
          const result = await db.queryValues(query, values);
          res.json(result.rows);
        } catch (err) {
          error.name = 'Query error';
          error.text = JSON.stringify(err.message);
          res.json({ error });
        }
      } else {
        error.name = 'Token not valid';
        error.code = 'tokenNotValid';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err.message);
      res.json({ error });
    }
  };

  const updateTableRecord = async (req, res) => {
    try {
      const { name } = req.params;
      const tokenData = await jwt.verifyToken(req, res);
      if (tokenData.roles.some(r => [1, 2].includes(r))) {
        const { login, password, restaurants } = tokenData;
        const data = { ...req.body };
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

        if (data.images) {
          await Promise.all(data.images.map(async (image) => {
            const { base64, path } = image;
            const file = await commonUtils.writeFile(path, base64);
            return file;
          }));
        }
        if (!req.body.id) {
          query = `INSERT INTO ${name} (${mapper.fields.join(', ')}) VALUES (${mapper.fields.map((key, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
          const result = await db.queryValues(query, mapper.values);

          if (name === 'data_restaurants') {
            query = 'UPDATE data_users SET restaurants=$1 WHERE login=$2 AND password=$3';
            values = [[...(restaurants || []), result.rows[0].id], login, password];
            await db.queryValues(query, values);
          }
          res.json(result.rows[0]);
        } else {
          query = `UPDATE ${name} SET ${mapper.fields.map((filed, f) => `${filed}=$${f + 2}`).join(', ')} WHERE id=$1 RETURNING *`;
          const result = await db.queryValues(query, [req.body.id, ...mapper.values]);
          res.json(result.rows[0]);
        }
      } else {
        error.name = 'Token not valid';
        error.code = 'tokenNotValid';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Not enough rights';
      error.code = 'notEnoughRights';
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  };

  const deleteFile = async (req, res) => {
    try {
      const { path } = req.body.data;
      const tokenData = await jwt.verifyToken(req, res);
      if (tokenData.roles.some(r => [1, 2].includes(r))) {
        await commonUtils.moveFile(path);
        res.json({});
      } else {
        error.name = 'Token not valid';
        error.code = 'tokenNotValid';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err.message);
      res.json({ error });
    }
  };

  return {
    getTableByNames,
    getTableRecord,
    getTableRecords,

    updateTableRecord,

    deleteFile,
  };
};

export default CommonController;
