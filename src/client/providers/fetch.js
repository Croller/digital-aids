import axios from 'axios';
import { getUrl } from 'client/utils/common';

const api = axios.create({
  crossdomain: true,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const URL = getUrl();

const error = {
  code: 0,
  name: '',
  text: '',
};

const setError = (err, data) => {
  const { status, statusText } = err.request;
  error.name = statusText;
  error.code = status;
  error.text = err.message;

  console.log('Request error:', {
    error,
    data,
  });
  return { error };
};

export const get = async (path, params = null, options = {}) => {
  let query = '';
  if (params) {
    const arrStr = Object.keys(params).reduce((arr, key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        return [...arr, `${key}=${value}`];
      }
      return [...arr, new URLSearchParams({ [key]: value }).toString()];
    }, []);
    query = `?${arrStr.join('&')}`;
  }

  try {
    return await api.get(`${URL}/api/${path}${query}`, { headers: { ...options } });
  } catch (err) {
    return setError(err, { 
      url: `${URL}/api/${path}${query}`,
      params,
      options,
    });
  }
};

export const post = async (path, params = {}, options = {}) => {
  try {
    return await api.post(`${URL}/api/${path}`, params, { headers: { ...options } });
  } catch (err) {
    return setError(err, { 
      url: `${URL}/api/${path}`,
      params,
      options,
    });
  }
};

export const remove = async (path, params = {}, options = {}) => {
  try {
    return await api.delete(`${URL}/api/${path}`, { headers: { ...options }, data: { ...params } });
  } catch (err) {
    return setError(err, { 
      url: `${URL}/api/${path}`,
      params,
      options,
    });
  }
};
