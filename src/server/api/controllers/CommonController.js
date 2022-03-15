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

        if (language !== 'en' && Object.keys(results).length > 0) {
          results = await Promise.allSettled(Object.keys(results).map(async (key) => {
            const resultsTr = await queryUtils.getRecordTranslate(key, results[key], language);
            return { key, values: resultsTr };
          }, []));
          results = results.reduce((obj, { value }) => ({ ...obj, [value.key]: value.values }), {});
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
        const language = req.headers['accept-language'];
        const arr = data.split(',');

        if (data.indexOf(',') > -1 && arr.length > 1) {
          results = await db.knex(name).whereRaw('id = ANY (?)', `{"${arr.join('", "')}"}`);
        } else {
          results = await db.knex(name).where({ id: data });
        }
        results = await queryUtils.getRecordTranslate(name, results, language);
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
        results = await db.knex(name).where({ ...data });
        results = await queryUtils.getRecordTranslate(name, results, language);
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

  const getRecordHistory = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);

    if (tokenData) {
      try {
        const { name } = req.params;
        const { data } = req.query;
        const language = req.headers['accept-language'];
        const logsTable = name.replace('data_', 'logs_');
        let resultsLog = await db.knex(logsTable).where({ id: data });
        results = await db.knex(name).where({ id: data });
        resultsLog = await queryUtils.getRecordTranslate(name, resultsLog, language);
        results = await queryUtils.getRecordTranslate(name, results, language);
        res.json([results[0], ...resultsLog.reverse()]);
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
    
    if (tokenData) {
      try {
        const { name } = req.params;
        const { data } = req.body;
        const language = req.headers['accept-language'];
        results = await queryUtils.searchRecord(name, data);
        results = await queryUtils.getRecordTranslate(name, results, language);
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
            const prom = await commonUtils.fileMove(path);
            return prom;
          }));
        } else {
          await commonUtils.fileMove(data);
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
    getRecordHistory,
    updateRecord,
    searchRecord,
    deleteRecord,
    deleteFile,
  };
};

module.exports = CommonController;
