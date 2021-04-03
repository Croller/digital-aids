import axios from 'axios';

let URL = '';
if (process.env.NODE_ENV === 'production') {
  URL = `https://${process.env.HOST}:${process.env.PORT_SERVER}`;
}

export const get = async (path, params = null, options = {}) => {
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    ...options,
  };
  try {
    const results = await axios.get(`${URL}/api/${path}${(params && `?${params}`) || ''}`, { headers });
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
    const results = axios.post(`${URL}/api/${path}`, { data: params }, { headers });
    return results;
  } catch (err) {
    return err;
  }
};
