/* eslint-disable no-useless-escape */
const fs = require('fs');
const path = require('path');

const staticPath = process.env.SERVER_STORAGE;

const Common = () => {
  const getEnv = () => {
    if (process.env.NODE_ENV === 'development') {
      return false;
    }
    return true;
  };

  const getStringRandom = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const getHeader = (req) => {
    const { headers } = req;
    if (!headers.authorization) return null;
    const [, str] = headers.authorization.split(' ');
    const token = str || null;
    return {
      ...headers,
      token,
    };
  };

  const fileRead = async (url = null) => new Promise((resolve, reject) => {
    try {
      const raw = fs.fileReadSync(path.resolve(`${staticPath}/${url}`));
      if (url.indexOf('.json')) {
        resolve(JSON.parse(raw));
      }
      resolve(raw);
    } catch (err) {
      reject(err);
    }
  });

  const fileWrite = async (url = null, data = null) => new Promise((resolve, reject) => {
    try {
      const ext = data.substring(data.indexOf('/') + 1, data.indexOf(';base64'));
      const fileType = data.substring('data:'.length, data.indexOf('/'));
      const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
      const base64Data = data.replace(regex, '');
      fs.fileWriteSync(path.resolve(`${staticPath}${url}`), base64Data, 'base64');
      resolve();
    } catch (err) {
      reject(err);
    }
  });

  const fileMove = async (url = null, desct = null) => new Promise((resolve, reject) => {
    try {
      fs.renameSync(path.resolve(`${staticPath}${url}`), path.resolve(`${staticPath}${desct}`));
      resolve();
    } catch (err) {
      reject(new Error(err));
    }
  });

  const fileDelete = async (url = null) => new Promise((resolve, reject) => {
    try {
      fs.renameSync(path.resolve(`${staticPath}${url}`), path.resolve(`${staticPath}/deleted${url}`));
      resolve();
    } catch (err) {
      reject(new Error(err));
    }
  });

  return {
    getEnv,
    getStringRandom,
    getHeader,
    fileRead,
    fileWrite,
    fileMove,
    fileDelete,
  };
};

module.exports = Common;
