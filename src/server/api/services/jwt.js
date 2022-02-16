const moment = require('moment');
const jwt = require('jsonwebtoken');
const db = require('./db');
const { setError } = require('../utils/common');

const signature = process.env.SERVER_AUTH_SECRET;
const expiration = process.env.SERVER_AUTH_TIME;
const expireTime = process.env.SERVER_AUTH_TIME.replace('h', '') * 60 * 60;

const getHeaderToken = (headers) => {
  if (!headers.authorization) return null;
  const [, token] = headers.authorization.split(' ');
  return token.length > 0 ? token : null;
};

const getHeaderLng = (headers) => {
  if (!headers['accept-language']) return 'en';
  return headers['accept-language'];
};

const generateToken = (obj = null) => {
  if (!obj) return null;
  return jwt.sign(obj, signature, { expiresIn: expiration });
};

const decodeToken = (req) => {
  const token = getHeaderToken(req.headers);
  if (token) {
    try {
      const data = jwt.verify(token, signature);
      return data;
    } catch (err) {
      setError('tokenNotValid', 'Token not valid', JSON.stringify(err.message));
      return null;
    }
  }
  setError('tokenNotExist', 'Token not exist');
  return null;
};

const verifyToken = async (req) => {
  const user = decodeToken(req);
  if (user) {
    const { login, password, enter_at } = user;
    const isExpired = moment().diff(moment(enter_at, 'YYYY-MM-DDTHH:mm:ss.SSS'), 'seconds') > expireTime;
    if (isExpired) return { user, ...setError('tokenIsExpired', 'Token is expired') };
    try {
      const query = 'SELECT * FROM data_users WHERE login=$1 AND password=$2';
      const results = await db.queryValues(query, [login, password]);
      if (results.rows.length === 1) {
        return results.rows[0];
      }
      setError('userNotFound', 'User not found');
      return null;
    } catch (err) {
      setError('queryError', 'Query error', JSON.stringify(err.message));
      return null;
    }
  }
  setError('tokenDecode', 'Token decode error');
  return null;
};

module.exports = {
  getHeaderLng,
  generateToken,
  decodeToken,
  verifyToken,
};
