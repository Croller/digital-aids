import axios from 'axios';

// const URL = process.env.REACT_APP_PORT_LOCAL_SERVER;

export const get = async (path, params = null, options = {}) => {
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    ...options,
  };
  try {
    const results = await axios.get(`/api/${path}${(params && `?${params}`) || ''}`, { headers });
    return results;
  } catch (err) {
    return err;
  }
};

export const post = async (path, params = {}, options = {}) => {
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    ...options,
  };

  try {
    const results = axios.post(`/api/${path}`, { data: params }, { headers });
    return results;
  } catch (err) {
    return err;
  }
};
