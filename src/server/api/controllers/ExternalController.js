const jwt = require('../services/jwt');
const google = require('../services/google');
const commonUtils = require('../utils/common');

const ExternalController = () => {
  let results = null;

  const getCoordsByAddress_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
   
    if (tokenData) {
      try {
        const data = req.query;
        results = await google.getCoordsByAddress(data);
        if (!results || (results && results.status === 'REQUEST_DENIED')) {
          res.status(201);
          res.json(commonUtils.setError('externalSourceError', 'Extrnal source error', results || (results && results.error_message)));
        } else {
          res.status(200);
          res.json(results.results);
        }
      } catch (err) {
        res.status(201);
        res.json(commonUtils.setError('externalSourceError', 'Extrnal source error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const getAddressByCoords_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
   
    if (tokenData) {
      try {
        const data = req.query;
        results = await google.getAddressByCoords(data);
        if (!results || (results && results.status === 'REQUEST_DENIED')) {
          res.status(201);
          res.json(commonUtils.setError('externalSourceError', 'Extrnal source error', results || (results && results.error_message)));
        } else {
          res.status(200);
          res.json(results.results);
        }
      } catch (err) {
        res.status(201);
        res.json(commonUtils.setError('externalSourceError', 'Extrnal source error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const getTextTranslate_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
   
    if (tokenData) {
      try {
        const { data } = req.body;
        results = await google.getTextTranslate(data);
        if (!results || (results && results.status === 'REQUEST_DENIED')) {
          res.status(201);
          res.json(commonUtils.setError('externalSourceError', 'Extrnal source error', results || (results && results.error_message)));
        } else {
          res.status(200);
          res.json(results.data.translations);
        }
      } catch (err) {
        res.status(201);
        res.json(commonUtils.setError('externalSourceError', 'Extrnal source error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const getGeolocation_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);

    if (tokenData) {
      try {
        results = await google.getGeolocation();
        if (!results || (results && results.status === 'REQUEST_DENIED')) {
          res.status(201);
          res.json(commonUtils.setError('externalSourceError', 'Extrnal source error', results || (results && results.error_message)));
        } else {
          res.status(200);
          res.json(results);
        }
      } catch (err) {
        res.status(201);
        res.json(commonUtils.setError('externalSourceError', 'Extrnal source error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  return {
    getCoordsByAddress_Google,
    getAddressByCoords_Google,
    getTextTranslate_Google,
    getGeolocation_Google,
  };
};

module.exports = ExternalController;  
