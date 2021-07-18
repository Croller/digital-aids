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
    const header = commonUtils.getHeader(req);
    const language = header['accept-language'];
    
    if (!tokenData) return;
    try {
      const { data } = req.query;
      let result = await Promise.all(data.split(',').map(async (name) => {
        const desc = await db.query(`SELECT * FROM ${name} ${name.indexOf('data_') > -1 ? 'WHERE is_deleted=FALSE' : ''} `);
        return { [name]: desc.rows }; 
      }));
      result = result.reduce((obj, arr) => ({ ...obj, ...arr }), {});

      if (language !== 'en') {
        let result_transalate = await Promise.all(data.split(',').map(async (name) => {
          const desc = await db.query(`SELECT * FROM ${name}_translate WHERE language='${language}' ${name.indexOf('data_') > -1 ? 'AND is_deleted=FALSE' : ''} `);
          return { [name]: desc.rows }; 
        }));
        result_transalate = result_transalate.reduce((obj, arr) => ({ ...obj, ...arr }), {});
        result = Object.keys(result).reduce((obj, key) => {
          if (result_transalate[key].length === 0) {
            return { ...obj, [key]: result[key] };
          } 
          return {
            ...obj,
            [key]: result_transalate[key].reduce((arr, item) => {
              const it = { ...item };
              delete it.language;
              return [...arr, it];
            }, []),
          };
        }, {});
      } 
      res.json(result);
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
    const header = commonUtils.getHeader(req);
    const language = header['accept-language'];

    if (!tokenData) return;
    try {
      const { name } = req.params;
      const { data } = req.body;

      let result = await queryUtils.getTableRecord(name, {
        ...data,
        is_deleted: false,
      }, { req, res });

      if (language !== 'en') {
        query = query.replace(name, `${name}_translate`);
        const result_transalate = await queryUtils.getTableRecord(`${name}_translate`, {
          id: result.map(item => item.id),
          language,
        }, { req, res });

        if (result_transalate.length > 0) {
          result = result.map(item => {
            const exist = result_transalate.find(tr => tr.id === item.id);
            if (exist) {
              return { ...item, ...exist };
            }
            return item;
          });
        }
      }
      res.json(result);
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
    const header = commonUtils.getHeader(req);
    const language = header['accept-language'];
    if (!tokenData) return null;
    try {
      const { name } = req.params;
      const { data } = req.body;
      const arr = Array.isArray(data) ? data : [data];

      results = await Promise.all(arr.map(async (row) => {
        const result = await queryUtils.updateTableRecord(name, row, {
          req,
          res,
          language, 
          user: tokenData,
        });
        return result;
      }));

      res.json(results);
    } catch (err) {
      error.name = 'Query error';
      error.code = 'queryError';
      error.text = JSON.stringify(err.message);
      res.status(201);
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
    if (!tokenData) return;
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
      res.status(201);
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

