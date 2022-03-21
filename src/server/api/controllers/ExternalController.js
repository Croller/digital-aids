const jwt = require('../services/jwt');
const google = require('../services/google');
const commonUtils = require('../utils/common');

const ExternalController = () => {
  let results = null;

  const getCoordsByAddress_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
   
    if (tokenData) {
      const data = req.query;
      results = await google.getCoordsByAddress(data);
      res.status(200);
      res.json(results);
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const getAddressByCoords_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
   
    if (tokenData) {
      const data = req.query;
      results = await google.getAddressByCoords(data);
      res.status(200);
      res.json(results);
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const getTextTranslate_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
   
    if (tokenData) {
      const { data } = req.body;
      results = await google.getTextTranslate(data);
      res.status(200);
      res.json(results);
    } else {
      res.status(201);
      res.json(commonUtils.setError('tokenNotValid', 'Token not valid'));
    }
  };

  const getGeolocation_Google = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);

    if (tokenData) {
      results = await google.getGeolocation();
      res.status(200);
      res.json(results);
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
