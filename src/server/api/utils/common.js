/* eslint-disable no-useless-escape */
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const geoip = require('geoip-lite');

const staticPath = process.env.SERVER_STORAGE;

const getEnv = () => {
  if (process.env.NODE_ENV === 'development') {
    return false;
  }
  return true;
};

const setError = (id = null, name = null, text = null) => {
  const error = !id ? null : { id, name, text };
  if (id) console.error('Error:', error);
  return { error };
};

const getMeta = (req) => {
  const { browser } = req.body.data.meta;
  delete browser.type;

  let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  ip = ip.replace('::ffff:', '');
  const geo = geoip.lookup(getEnv() ? ip : '83.220.237.49');
  return { browser, ip, geo };
};

const get = async (url = null) => {
  if (!url) return null;
  try {
    const results = await axios.get(encodeURI(url));
    return results;
  } catch (err) {
    return new Error(err);
  }
};

const post = async (url = null, data = null) => {
  if (!url || !data) return null;
  try {
    const results = await axios.post(encodeURI(url), data);
    return results;
  } catch (err) {
    return new Error(err);
  }
};

const getStringRandom = (length = 15) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  return [...Array(length).fill(null)].reduce(str => `${str}${characters.charAt(Math.floor(Math.random() * charactersLength))}`, '');
};

const getHeader = (req) => {
  const { headers } = req;
  if (!headers.authorization) return null;
  const [, token] = headers.authorization.split(' ');
  return {
    ...headers,
    authorization: token || null,
  };
};

const fileRead = async (url) => new Promise((resolve, reject) => {
  try {
    const raw = fs.readFileSync(path.resolve(`${staticPath}/${url}`));
    if (url.indexOf('.json')) {
      resolve(JSON.parse(raw));
    }
    resolve(raw);
  } catch (err) {
    reject(new Error(err));
  }
});

const fileWrite = async (url, data) => new Promise((resolve, reject) => {
  try {
    const ext = data.substring(data.indexOf('/') + 1, data.indexOf(';base64'));
    const fileType = data.substring('data:'.length, data.indexOf('/'));
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    const base64Data = data.replace(regex, '');
    fs.writeFileSync(path.resolve(`${staticPath}${url}`), base64Data, 'base64');
    resolve();
  } catch (err) {
    reject(new Error(err));
  }
});

const fileMove = async (url) => new Promise((resolve, reject) => {
  try {
    fs.renameSync(path.resolve(`${staticPath}${url}`), path.resolve(`${staticPath}/deleted${url}`));
    resolve();
  } catch (err) {
    reject(new Error(err));
  }
});

module.exports = {
  get,
  post,
  getEnv,
  setError,
  getMeta,
  getStringRandom,
  getHeader,
  fileRead,
  fileWrite,
  fileMove,
};
