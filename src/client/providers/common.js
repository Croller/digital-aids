import {
  get,
  getExternal,
  post,
  remove,
} from 'client/providers/fetch';

const headers = ({
  token = null,
  language = null,
}) => ({
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...(language ? { 'Accept-Language': language } : {}),
});

export const loadTable = async ({
  token,
  data,
  language = 'en',
}) => {
  const results = await get('table', { data }, headers({ token, language }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const loadRow = async ({
  token,
  name,
  data,
  language = 'en',
}) => {
  const results = await get(`table/${name}/record`, { data }, headers({ token, language }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const loadRowByParam = async ({
  token,
  name,
  data,
  language = 'en',
}) => {
  const results = await post(`table/${name}/record`, { data }, headers({ token, language }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const update = async ({
  token,
  name,
  data,
  language = 'en',
}) => {
  const results = await post(`table/${name}/record/update`, { data }, headers({ token, language }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const deleteFiles = async ({
  token,
  data,
}) => {
  const results = await remove('file/delete', { data }, headers({ token }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const getCoordsByAddress = async ({
  address,
  language = 'en',
}) => {
  const results = await getExternal(`https://maps.googleapis.com/maps/api/geocode/json?language=${language}&address=${address.replace(/ /g, '+')}&key=${process.env.API_KEY_GOOGLE_GEOCODE}`);
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const getTranslate = async ({
  text,
  sourceLng = 'en',
  targetLng = 'en',
}) => {
  const results = await getExternal(`https://translation.googleapis.com/language/translate/v2?key=${process.env.API_KEY_GOOGLE_TRANSLATE}&q=${text}&source=${sourceLng}&target=${targetLng}`);
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const sendFromInfo = async ({
  token,
  data,
}) => {
  const results = await post('mailer/send', { data }, headers({ token }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};
