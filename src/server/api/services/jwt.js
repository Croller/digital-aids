const jwt = require('jsonwebtoken');
const db = require('./db');

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

  getToken: (req) => {
    const { headers: { authorization } } = req;
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      return jwt.verify(authorization.split(' ')[1], signature);
    }
    return null;
  },

  verifyToken: async (req, res) => {
    const { headers: { authorization } } = req;
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      const data = jwt.verify(authorization.split(' ')[1], signature);
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
};
