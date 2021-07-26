/* eslint-disable no-useless-escape */
const fs = require('fs');
const path = require('path');

const staticPath = process.env.SERVER_STORAGE;

module.exports = {
  nodeEnv: () => {
    if (process.env.NODE_ENV === 'development') {
      return false;
    }
    return true;
  },
  getStringRandom: (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  getHeader: (req) => {
    const { headers } = req;
    const { authorization } = headers;
    if (!authorization) return null;
    const [bearer, token] = authorization.split(' ');
    return {
      ...headers,
      authorization: (authorization && bearer && token ? token : null),
    };
  },
  readFile: async (url) => new Promise((resolve, reject) => {
    try {
      const raw = fs.readFileSync(path.resolve(`${staticPath}/${url}`));
      if (url.indexOf('.json')) {
        resolve(JSON.parse(raw));
      }
      resolve(raw);
    } catch (err) {
      reject(err);
    }
  }),
  writeFile: async (url, data) => new Promise((resolve, reject) => {
    try {
      const ext = data.substring(data.indexOf('/') + 1, data.indexOf(';base64'));
      const fileType = data.substring('data:'.length, data.indexOf('/'));
      const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
      const base64Data = data.replace(regex, '');
      fs.writeFileSync(path.resolve(`${staticPath}${url}`), base64Data, 'base64');
      resolve();
    } catch (err) {
      reject(err);
    }
  }),
  moveFile: async (url) => new Promise((resolve, reject) => {
    try {
      fs.renameSync(path.resolve(`${staticPath}${url}`), path.resolve(`${staticPath}/deleted${url}`));
      resolve();
    } catch (err) {
      reject(new Error(err));
    }
  }),
};
