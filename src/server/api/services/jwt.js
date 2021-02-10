require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('./db');

const signature = process.env.SERVER_AUTH_SECRET;
const expiration = process.env.SERVER_AUTH_TIME;

module.exports = {
  generateToken: (user) => {
    const obj = {
      id: user.id,
      login: user.login,
      password: user.password,
    };
    return jwt.sign(obj, signature, { expiresIn: expiration });
  },

  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return jwt.verify(req.headers.authorization.split(' ')[1], signature);
    }
    return null;
  },

  verifyToken: async (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const data = jwt.verify(req.headers.authorization.split(' ')[1], signature);
      if (data) {
        const { login, password } = data;
        const result = await db.query(`SELECT * FROM data_users WHERE login='${login}' AND password='${password}'`);
        if (result.rows.length === 1) {
          const user = result.rows[0];
          return user;
        }
        return null;
      }
      return null;
    }
    return null;
  },
};
