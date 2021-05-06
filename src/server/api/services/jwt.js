const jwt = require('jsonwebtoken');
const db = require('./db');
const commonUtils = require('../utils/common');

const signature = process.env.SERVER_AUTH_SECRET;
const expiration = process.env.SERVER_AUTH_TIME;

const error = {
  code: 0,
  name: '',
  text: '',
};

module.exports = {
  generateToken: (user) => {
    const obj = {
      id: user.id,
      login: user.login,
      password: user.password,
    };
    return jwt.sign(obj, signature, { expiresIn: expiration });
  },

  // getToken: (req) => {
  //   const { authorization } = commonUtils.getHeader(req);
  //   if (authorization) {
  //     return jwt.verify(authorization, signature);
  //   }
  //   return null;
  // },

  verifyToken: async (req, res) => {
    const { authorization } = commonUtils.getHeader(req);
    if (authorization) {
      const data = jwt.verify(authorization, signature);
      if (data) {
        const { login, password } = data;
        const result = await db.query(`SELECT * FROM data_users WHERE login='${login}' AND password='${password}'`);
        if (result.rows.length === 1) {
          const user = result.rows[0];
          return user;
        }
        error.name = 'User not found';
        error.code = 'userNotFound';
        res.json({ error });
        return null;
      } 
      error.name = 'Token not valid';
      error.code = 'tokenNotValid';
      res.json({ error });
      return null;
    } 
    error.name = 'Token not exist';
    error.code = 'tokenNotExist';
    res.json({ error });
    return null;
  },
  
  verifyRoles: (req, res, userRoles, roles) => {
    if (userRoles.some(r => roles.includes(r))) {
      return true;
    } 
    error.name = 'Token not exist';
    error.code = 'tokenNotExist';
    res.json({ error });
    return null;
  }, 
};
