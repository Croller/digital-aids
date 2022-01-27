/* eslint-disable no-useless-escape */
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const staticPath = process.env.SERVER_STORAGE;

const getEnv = () => {
  if (process.env.NODE_ENV === 'development') {
    return false;
  }
  return true;
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

const getMailAddress = (type = null) => {
  if (type && ['registration', 'restore'].includes(type)) {
    return `support@${process.env.HOST}`;
  }
  return `info@${process.env.HOST}`;
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
  getMailAddress,
  getStringRandom,
  getHeader,
  fileRead,
  fileWrite,
  fileMove,
};
