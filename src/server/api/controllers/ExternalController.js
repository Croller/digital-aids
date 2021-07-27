const jwt = require('../services/jwt');
const google = require('../services/google');

const setError = (error) => ({
  name: 'Service error',
  code: 'serviceError',
  text: JSON.stringify(error.message),
});

const ExternalController = () => {
  let results = null;

  const getCoordsByAddress_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req, res);
    if (!tokenData) return;
    try {
      const data = req.query;
      results = await google.getCoordsByAddress(data);
      res.status(200);
      res.json(results);
    } catch (err) {
      res.status(201);
      res.json(setError(err));
    }
  };

  const getAddressByCoords_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req, res);
    if (!tokenData) return;
    try {
      const data = req.query;
      results = await google.getAddressByCoords(data);
      res.status(200);
      res.json(results);
    } catch (err) {
      res.status(201);
      res.json(setError(err));
    }
  };

  const getTextTranslate_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req, res);
    if (!tokenData) return;
    try {
      const data = req.query;
      results = await google.getTextTranslate(data);
      res.status(200);
      res.json(results);
    } catch (err) {
      res.status(201);
      res.json(setError(err));
    }
  };

  const getGeolocation_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req, res);
    if (!tokenData) return;
    try {
      const data = req.body;
      results = await google.getGeolocation(data);
      console.log('geoloc', results);
      res.status(200);
      res.json(results);
    } catch (err) {
      res.status(201);
      res.json(setError(err));
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
