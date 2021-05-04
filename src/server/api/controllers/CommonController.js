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
    const tokenData = await jwt.verifyToken(req, res);
    if (!tokenData) return;
    try {
      const { data } = req.query;
      const result = await Promise.all(data.split(',').map(async (name) => {
        const desc = await db.query(`SELECT * FROM ${name} ${name.indexOf('data_') > -1 ? 'WHERE is_deleted=FALSE' : ''} `);
        return { [name]: desc.rows }; 
      }));
      res.json(result.reduce((obj, arr) => ({ ...obj, ...arr }), {}));
    } catch (err) {
      error.name = 'Query error';
      error.code = 'queryError';
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  };

  const getTableRecordById = async (req, res) => {
    const tokenData = await jwt.verifyToken(req, res);
    if (!tokenData) return;
    try {
      const { name } = req.params;
      const { data } = req.query;
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
      error.code = 'queryError';
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  };

  const getTableRecordByParam = async (req, res) => {
    const tokenData = await jwt.verifyToken(req, res);
    if (!tokenData) return;
    try {
      const { name } = req.params;
      const { data } = req.body;
      const queryStr = Object.keys(data).map((key, k) => {
        if (data[key] && Array.isArray(data[key])) {
          return `${key} = ANY ($${k + 1})`;
        }
        return `${key}=($${k + 1})`;
      }).join(' AND ');
      query = `SELECT * FROM ${name} WHERE ${queryStr} AND is_deleted=FALSE`;
      values = Object.keys(data).map(key => data[key]);
      const result = await db.queryValues(query, values);
      res.json(result.rows);
    } catch (err) {
      error.name = 'Query error';
      error.code = 'queryError';
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  };

  const updateTableRecord = async (req, res) => {
    const tokenData = await jwt.verifyToken(req, res);
    const rolesExist = jwt.verifyRoles(req, res, tokenData.roles, [1, 2, 3]);
    if (!tokenData || !rolesExist) return;
    try {
      const { name } = req.params;
      const { data } = req.body;
      if (Array.isArray(data)) {
        results = await Promise.all(data.map(async (row) => {
          const result = await queryUtils.updateTableRecord(name, row, { req, res, user: tokenData });
          return result;
        }));
      } else {
        results = await queryUtils.updateTableRecord(name, data, { req, res, user: tokenData });
      }
      res.json(results);
    } catch (err) {
      error.name = 'Query error';
      error.code = 'queryError';
      error.text = JSON.stringify(err.message);
      res.json({ error });
    }
  };

  const deleteTableRecord = async (req, res) => {
    const tokenData = await jwt.verifyToken(req, res);
    if (!tokenData) return;
    try {
      const { name } = req.params;
      const { data } = req.body;
      const queryStr = Object.keys(data).map((key, k) => `${key}=($${k + 1})`).join(' AND ');
      query = `DELETE FROM ${name} WHERE ${queryStr}`;
      values = Object.keys(data).map(key => data[key]);
      const result = await db.queryValues(query, values);
      res.json(result.rows);
    } catch (err) {
      error.name = 'Query error';
      error.code = 'queryError';
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  };

  const deleteFile = async (req, res) => {
    const tokenData = await jwt.verifyToken(req, res);
    const rolesExist = jwt.verifyRoles(req, res, tokenData.roles, [1, 2, 3]);
    if (!tokenData || !rolesExist) return;
    try {
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
    } catch (err) {
      error.name = 'Delete file error';
      error.code = 'deleteFile';
      error.text = JSON.stringify(err.message);
      res.json({ error });
    }
  };

  return {
    getTableByNames,
    getTableRecordById,
    getTableRecordByParam,

    updateTableRecord,
    deleteTableRecord,

    deleteFile,
  };
};

module.exports = CommonController;  

