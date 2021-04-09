const fs = require('fs');
const path = require('path');

module.exports = {
  nodeEnv: () => {
    if (process.env.NODE_ENV === 'development') {
      return false;
    }
    return true;
  },
  generateStr: (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  readFile: async (url) => new Promise((resolve, reject) => {
    try {
      const raw = fs.readFileSync(path.resolve(`src/server/static/${url}`));
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
      const base64Data = data.replace(/^data:image\/png;base64,/, '');
      fs.writeFileSync(path.resolve(`src/server/static${url}`), base64Data, 'base64');
      resolve();
    } catch (err) {
      reject(err);
    }
  }),
};
