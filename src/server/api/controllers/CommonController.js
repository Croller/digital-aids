const db = require('../services/db');
const jwt = require('../services/jwt');
const commonUtils = require('../utils/common');
const queryUtils = require('../utils/query');

const error = {
  code: 0,
  name: '',
  text: '',
};

const CommonController = () => {
  let query = '';
  let values = [];
  let results = null;
  
  const getTableByNames = async (req, res) => {
    try {
      const tokenData = await jwt.verifyToken(req, res);
      if (tokenData) {
        const { data } = req.query;
        const result = await Promise.all(data.split(',').map(async (name) => {
          const desc = await db.query(`SELECT * FROM ${name} ${name.indexOf('data_') > -1 ? 'WHERE is_deleted=FALSE' : ''} `);
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
        const { data } = req.query;
        try {
          const arr = data.split(',');
          if (Array.isArray(arr)) {
            query = `SELECT * FROM ${name} WHERE id = ANY ($1) AND is_deleted=FALSE`;
            values = [arr];
          } else {
            query = `SELECT * FROM ${name} WHERE id=($1) AND is_deleted=FALSE`;
            values = [data];
          }
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
      if (tokenData && tokenData.roles.some(r => [1, 2, 3].includes(r))) {
        const { data } = req.body;
        if (Array.isArray(data)) {
          results = await Promise.all(data.map(async (row) => {
            const result = await queryUtils.updateRowAndUser(name, row, { req, res, tokenData });
            return result;
          }));
        } else {
          results = await queryUtils.updateRowAndUser(name, data, { req, res, tokenData });
        }
        res.json(results);
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
      const tokenData = await jwt.verifyToken(req, res);
      if (tokenData && tokenData.roles.some(r => [1, 2, 3].includes(r))) {
        const { data } = req.body;
        if (Array.isArray(data)) {
          await Promise.all(data.map(async (path) => {
            const prom = await commonUtils.moveFile(path);
            return prom;
          }));
        } else {
          await commonUtils.moveFile(data);
        }
        res.json({});
      } else {
        error.name = 'Token not valid';
        error.code = 'tokenNotValid';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Delete file error';
      error.code = 'deleteFile';
      error.text = JSON.stringify(err.message);
      res.json({ error });
    }
  };

  return {
    getTableByNames,
    getTableRecord,

    updateTableRecord,

    deleteFile,
  };
};

export default CommonController;
