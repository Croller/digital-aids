const commonUtils = require('../utils/common');

const googleApiGeocode = process.env.API_KEY_GOOGLE_GEOCODING;
const googleApiTranslate = process.env.API_KEY_GOOGLE_TRANSLATE;
const googleApiGeolocation = process.env.API_KEY_GOOGLE_GEOLOCATION;

const getResponse = (key, { status, data }) => {
  const error = commonUtils.setError('externalSourceError', 'Extrnal source error', data || (data && data.error_message));
  if (status === 200) {
    if (data.status === 'REQUEST_DENIED') {
      return { error };
    }
    if (key === 'coords' || key === 'address') return data.results;
    if (key === 'location') return data;
    if (key === 'translate') return data.data.translations;
  }
  return { error };
};

const getCoordsByAddress = async ({
  address = null,
  language = 'en',
}) => {
  try {
    if (!address) return null;
    const response = await commonUtils.get(`https://maps.googleapis.com/maps/api/geocode/json?language=${language}&address=${address.replace(/ /g, '+')}&key=${googleApiGeocode}`);
    return getResponse('coords', response);
  } catch (err) {
    return { error: commonUtils.setError('externalSourceError', 'Extrnal source error', JSON.stringify(err.message)) };
  }
};

const getAddressByCoords = async ({
  latlng = null,
  language = 'en',
}) => {
  try {
    if (!latlng) return null;
    const response = await commonUtils.get(`https://maps.googleapis.com/maps/api/geocode/json?language=${language}&latlng=${latlng}&key=${googleApiGeocode}`);
    return getResponse('address', response);
  } catch (err) {
    return { error: commonUtils.setError('externalSourceError', 'Extrnal source error', JSON.stringify(err.message)) };
  }
};

const getGeolocation = async () => {
  try {
    const response = await commonUtils.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiGeolocation}`, {});
    return getResponse('location', response);
  } catch (err) {
    return { error: commonUtils.setError('externalSourceError', 'Extrnal source error', JSON.stringify(err.message)) };
  }
};

const getTextTranslate = async ({
  text = null,
  sourceLng = 'en',
  targetLng = 'en',
}) => {
  try {
    if (!text || sourceLng === targetLng) return null;
    const response = await commonUtils.get(`https://translation.googleapis.com/language/translate/v2?key=${googleApiTranslate}&q=${text.replace(/ /g, '+')}&source=${sourceLng}&target=${targetLng}`);
    return getResponse('translate', response);
  } catch (err) {
    return { error: commonUtils.setError('externalSourceError', 'Extrnal source error', JSON.stringify(err.message)) };
  }
};

module.exports = {
  getCoordsByAddress,
  getAddressByCoords,
  getGeolocation,
  getTextTranslate,
};
