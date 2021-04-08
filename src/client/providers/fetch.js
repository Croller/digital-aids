import axios from 'axios';
import { getUrl } from 'client/utils/common';

let instance = null;

const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
};

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

export const createAxios = ({ token }) => { 
  instance = axios.create({
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const get = async (path, params = null, options = {}) => {
  let query = '';
  if (params) {
    query = `?${new URLSearchParams(params).toString()}`;
  }

  try {
    return await (instance || axios).get(`${URL}/api/${path}${query}`, { headers: { ...headers, ...options } });
  } catch (err) {
    return setError(err, { 
      url: `${URL}/api/${path}${query}`,
      params,
      options,
      headers,
    });
  }
};

export const post = async (path, params = {}, options = {}) => {
  try {
    return await (instance || axios).post(`${URL}/api/${path}`, { data: params }, { headers: { ...headers, ...options } });
  } catch (err) {
    return setError(err, { 
      url: `${URL}/api/${path}`,
      params,
      options,
      headers,
    });
  }
};
