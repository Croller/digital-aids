import axios from 'axios';

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

const Fetch = () => {
  const init = axios.create({
    crossdomain: true,
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'en',
    },
  });

  const get = async (path, params = null, options = {}) => {
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
      return await init.get(`${path}/${query}`, { headers: { ...options } });
    } catch (err) {
      return setError(err, { 
        url: `${path}/${query}`,
        params,
        options,
      });
    }
  };

  const post = async (path, params = {}, options = {}) => {
    try {
      const result = await init.post(path, params, { headers: { ...options } });
      if (result.data) {
        return result.data;
      }
      return null;
    } catch (err) {
      return setError(err, { 
        url: path,
        params,
        options,
      });
    }
  };

  return {
    init,
    get,
    post,
  };
};

module.exports = Fetch;
