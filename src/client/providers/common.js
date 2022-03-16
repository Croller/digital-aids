import {
  get,
  post,
  remove,
} from 'client/providers/fetch';

const headers = ({
  token = null,
  language = null,
  languages = null,
}) => ({
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...(language ? { 'Accept-Language': language } : {}),
  ...(languages ? { 'Content-Language': languages.join(', ') } : {}),
});

export const getTables = async ({
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

export const getRecordById = async ({
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

export const getRecordByParam = async ({
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

export const updateRecord = async ({
  token,
  name,
  data,
  language = 'en',
  languages = null,
}) => {
  const results = await post(`table/${name}/record/update`, { data }, headers({ token, language, languages }));
  if (results.status && results.data && [200, 201].includes(results.status)) {
    return results.data;
  }
  return results;
};

export const deleteRecord = async ({
  token,
  name,
  data,
  language = 'en',
}) => {
  const results = await remove(`table/${name}/record/delete`, { data }, headers({ token, language }));
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
