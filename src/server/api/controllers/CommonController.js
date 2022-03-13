const db = require('../services/db');
const jwt = require('../services/jwt');
const commonUtils = require('../utils/common');
const queryUtils = require('../utils/query');

const CommonController = () => {
  let query = '';
  let values = [];
  let results = null;
  
  const getTables = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);

    if (tokenData) {
      try {
        const { data } = req.query;
        const names = data.split(',');
        const language = req.headers['accept-language'];
        results = await queryUtils.getTables(names);

        if (language !== 'en') {
          const tableTrExist = await queryUtils.getTableAll();
          const tableTrNames = names.filter(name => tableTrExist.some(s => s === `${name}_translate}`));
          const result_transalate = await queryUtils.getTables(tableTrNames);

          if (Object.keys(result_transalate).length > 0) {
            results = Object.keys(results).reduce((obj, key) => {
              const rows = result_transalate[key];
              
              if (!rows || (rows && rows.length === 0)) {
                return { ...obj, [key]: results[key] };
              } 
              const rowsTr = rows.reduce((arr, item) => {
                const it = { ...item };
                delete it.language;
                return [...arr, it];
              }, []);
              return { ...obj, [key]: rowsTr };
            }, {});
          }
        }
        res.json(results);
      } catch (err) {
        res.status(201);
        res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const getTableStats = async (req, res) => {
    // TODO
  };

  const getTableRecordById = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);

    if (tokenData) {
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
        res.status(201);
        res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const getTableRecordByParam = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);

    if (tokenData) {
      try {
        const { name } = req.params;
        const { data } = req.body;
        const language = req.headers['accept-language'];
        const tableExist = await queryUtils.isTableExist(`${name}_translate`);
        results = await db.knex(name).where({ ...data });

        if (tableExist && language !== 'en') {
          const result_tr = await db.knex(`${name}_translate`).where({ id: results.map(item => item.id), language });

          if (result_tr.length > 0) {
            results = results.map(item => {
              const exist = result_tr.find(tr => tr.id === item.id);
              return exist ? { ...item, ...exist } : item;
            });
          }
        }
        res.json(results);
      } catch (err) {
        res.status(201);
        res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const updateTableRecord = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    if (tokenData) {
      try {
        const { name } = req.params;
        const { data } = req.body;
        const language = req.headers['accept-language'];
        const arr = Array.isArray(data) ? data : [data];
        results = await Promise.all(arr.map(async (row) => {
          const result = await queryUtils.updateTableRecord(name, row, language, tokenData);
          return result;
        }));
        res.json(results.filter(item => item));
      } catch (err) {
        res.status(201);
        res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const searchTableRecord = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    const language = req.headers['accept-language'];
    
    if (tokenData) {
      try {
        const { name } = req.params;
        const { data } = req.body;
        results = await searchTableRecord(name, data);

        if (results.length > 0) {
          results = await (async (row) => {
            const result = await queryUtils.updateTableRecord(name, row, language, tokenData);
            return result;
          });
          return results;
        } 
        return null;
      } catch (err) {
        res.status(201);
        res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const deleteTableRecord = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);

    if (tokenData) {
      try {
        const { name } = req.params;
        const { data } = req.body;
        const queryStr = Object.keys(data).map((key, k) => `${key}=($${k + 1})`).join(' AND ');
        query = `DELETE FROM ${name} WHERE ${queryStr}`;
        values = Object.keys(data).map(key => data[key]);
        const result = await db.queryValues(query, values);
        res.json(result.rows);
      } catch (err) {
        res.status(201);
        res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const deleteFile = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    
    if (tokenData) {
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
        res.status(201);
        res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  return {
    getTables,
    getTableStats,
    getTableRecordById,
    getTableRecordByParam,
    updateTableRecord,
    searchTableRecord,
    deleteTableRecord,
    deleteFile,
  };
};

module.exports = CommonController;
