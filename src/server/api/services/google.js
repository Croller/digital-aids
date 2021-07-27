const commonUtils = require('../utils/common');

const googleApiGeocode = process.env.API_KEY_GOOGLE_GEOCODING;
const googleApiTranslate = process.env.API_KEY_GOOGLE_TRANSLATE;
const googleApiGeolocation = process.env.API_KEY_GOOGLE_GEOLOCATION;

let results = null;

const getCoordsByAddress = async ({
  address = null,
  language = 'en',
}) => {
  if (!address) return null;
  results = await commonUtils.get(`https://maps.googleapis.com/maps/api/geocode/json?language=${language}&address=${address.replace(/ /g, '+')}&key=${googleApiGeocode}`);
  if (results.status === 200 && results.statusText === 'OK') {
    return results.data.results;
  }
  return null;
};

const getAddressByCoords = async ({
  latlng = null,
  language = 'en',
}) => {
  if (!latlng) return null;
  results = await commonUtils.get(`https://maps.googleapis.com/maps/api/geocode/json?language=${language}&latlng=${latlng}&key=${googleApiGeocode}`);
  if (results.status === 200 && results.statusText === 'OK') {
    return results.data.results;
  }
  return null;
};

const getTextTranslate = async ({
  text = null,
  sourceLng = 'en',
  targetLng = 'en',
}) => {
  if (!text || sourceLng === targetLng) return null;
  results = await commonUtils.get(`https://translation.googleapis.com/language/translate/v2?key=${googleApiTranslate}&q=${text.replace(/ /g, '+')}&source=${sourceLng}&target=${targetLng}`);
  if (results.status === 200 && results.statusText === 'OK') {
    return results.data.data.translations;
  }
  return null;
};

const getGeolocation = async ({
  data = {},
}) => {
  if (!data) return null;
  results = await commonUtils.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiGeolocation}`, data);
  if (results.status === 200 && results.statusText === 'OK') {
    return results.data;
  }
  return null;
};

module.exports = {
  getCoordsByAddress,
  getAddressByCoords,
  getTextTranslate,
  getGeolocation,
};
