const jwt = require('../services/jwt');
const google = require('../services/google');

const setError = (error) => ({
  id: 'serviceError',
  name: 'Service error',
  text: error,
});

const ExternalController = () => {
  let results = null;

  const getCoordsByAddress_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    if (!tokenData) return;
    try {
      const data = req.query;
      results = await google.getCoordsByAddress(data);
      if (!results || (results && results.status === 'REQUEST_DENIED')) {
        res.status(201);
        res.json(setError(results || (results && results.error_message)));
      } else {
        res.status(200);
        res.json(results.results);
      }
    } catch (err) {
      res.status(201);
      res.json(setError(JSON.stringify(err.message)));
    }
  };

  const getAddressByCoords_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    if (!tokenData) return;
    try {
      const data = req.query;
      results = await google.getAddressByCoords(data);
      if (!results || (results && results.status === 'REQUEST_DENIED')) {
        res.status(201);
        res.json(setError(results || (results && results.error_message)));
      } else {
        res.status(200);
        res.json(results.results);
      }
    } catch (err) {
      res.status(201);
      res.json(setError(JSON.stringify(err.message)));
    }
  };

  const getTextTranslate_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    if (!tokenData) return;
    try {
      const data = req.query;
      results = await google.getTextTranslate(data);
      if (!results || (results && results.status === 'REQUEST_DENIED')) {
        res.status(201);
        res.json(setError(results || (results && results.error_message)));
      } else {
        res.status(200);
        res.json(results.data.translations);
      }
    } catch (err) {
      res.status(201);
      res.json(setError(JSON.stringify(err.message)));
    }
  };

  const getGeolocation_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    if (!tokenData) return;
    try {
      results = await google.getGeolocation();
      if (!results || (results && results.status === 'REQUEST_DENIED')) {
        res.status(201);
        res.json(setError(results || (results && results.error_message)));
      } else {
        res.status(200);
        res.json(results);
      }
    } catch (err) {
      res.status(201);
      res.json(setError(JSON.stringify(err.message)));
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
