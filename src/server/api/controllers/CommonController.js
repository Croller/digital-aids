const db = require('../services/db');
const jwt = require('../services/jwt');
const commonUtils = require('../utils/common');
const queryUtils = require('../utils/query');

const CommonController = () => {
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
    const tokenData = await jwt.verifyToken(req);

    if (tokenData) {
      try {
        const { name } = req.params;
        results = await queryUtils.getTableStats(name);
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

  const getRecordById = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);

    if (tokenData) {
      try {
        const { name } = req.params;
        const { data } = req.query;
        const arr = data.split(',');
        if (data.indexOf(',') > -1 && arr.length > 1) {
          results = await db.knex(name).whereRaw('id = ANY (?)', `{"${arr.join('", "')}"}`);
        } else {
          results = await db.knex(name).where({ id: data });
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

  const getRecordByParam = async (req, res) => {
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

  const updateRecord = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    if (tokenData) {
      try {
        const { name } = req.params;
        const { data } = req.body;
        const language = req.headers['accept-language'];
        const arr = Array.isArray(data) ? data : [data];
        results = await Promise.all(arr.map(async (row) => {
          const result = await queryUtils.updateRecord(name, row, language, tokenData);
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

  const searchRecord = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    const language = req.headers['accept-language'];
    
    if (tokenData) {
      try {
        const { name } = req.params;
        const { data } = req.body;
        results = await searchRecord(name, data);

        if (results.length > 0) {
          results = await (async (row) => {
            const result = await queryUtils.searchRecord(name, row, language, tokenData);
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

  const deleteRecord = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    const language = req.headers['accept-language'];

    if (tokenData) {
      try {
        const { name } = req.params;
        const { data } = req.body;
        results = await queryUtils.updateRecord(name, { ...data, is_deleted: true }, language, tokenData);
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
    getRecordById,
    getRecordByParam,
    updateRecord,
    searchRecord,
    deleteRecord,
    deleteFile,
  };
};

module.exports = CommonController;
