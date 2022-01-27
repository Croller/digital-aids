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

const generateToken = (obj = null) => {
  if (!obj) return null;
  return jwt.sign(obj, signature, { expiresIn: expiration });
};

const decodeToken = (req, res) => {
  const { authorization } = commonUtils.getHeader(req);
  if (authorization) {
    const data = jwt.verify(authorization, signature);
    if (data) return data;
    error.name = 'Token not valid';
    error.id = 'tokenNotValid';
    res.status(201);
    res.json({ error });
    return null;
  } 
  error.name = 'Token not exist';
  error.id = 'tokenNotExist';
  res.status(201);
  res.json({ error });
  return null;
};

const verifyToken = async (req, res) => {
  const data = decodeToken(req, res);
  if (data) {
    const { login, password } = data;
    const query = 'SELECT * FROM data_users WHERE login=$1 AND password=$2';
    const values = [login, password];
    const results = await db.queryValues(query, values);
    if (results.rows.length === 1) {
      const user = results.rows[0];
      return user;
    }
  }
  error.name = 'User not found';
  error.id = 'userNotFound';
  res.status(201);
  res.json({ error });
  return null;
};

// const verifyRoles = async (req, res, tokenData, roles) => {
//   query = 'SELECT * FROM data_roles WHERE id = ANY ($1) AND is_deleted=FALSE';
//   values = [tokenData.roles];
//   results = await db.queryValues(query, values);
//   if (results.rows.length > 0 && roles.some(r => results.rows.some(s => s[r]))) {
//     return true;
//   }
//   error.name = 'Roles not exist';
//   error.id = 'rolesNotExist';
//   res.json({ error });
// }; 

module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
  // verifyRoles,
};
