const moment = require('moment');
const geoip = require('geoip-lite');
const db = require('../services/db');
const jwt = require('../services/jwt');
const mailer = require('../services/mailer');
const commonUtils = require('../utils/common');
const queryUtils = require('../utils/query');

const error = {
  code: 0,
  name: '',
  text: '',
};

const UserController = () => {
  let query = '';
  let values = [];
  let results = null;

  const auth = async (req, res) => {
    const tokenData = await jwt.verifyToken(req, res);
    if (tokenData) {
      const expireTime = process.env.SERVER_AUTH_TIME.replace('h', '') * 60 * 60;
      const diffEnterTime = moment().diff(moment(tokenData.enter_at, 'YYYY-MM-DDTHH:mm:ss.SSS'), 'seconds');
      const expired = diffEnterTime > expireTime;

      if (!expired) {
        req.body.data = tokenData;
        UserController().signin(req, res);
      } else {
        error.name = 'Token expired';
        error.id = 'tokenExpiredError';
        error.text = '';
        res.status(201);
        res.json({ error });
      }
    } else {
      error.name = 'Auth error';
      error.id = 'authError';
      error.text = null;
      res.status(201);
      res.json({ error });
    }
  };

  const signin = async (req, res) => {
    const {
      login,
      password,
      language = 'en',
      browser = {},
    } = req.body.data;

    // get ip user
    let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    ip = ip.replace('::ffff:', '');
    const geo = geoip.lookup(commonUtils.getEnv() ? ip : '83.220.237.49');
    const meta = JSON.stringify({ ip, browser, geo });

    try {
      query = 'SELECT * FROM data_users WHERE login=$1 AND password=$2';
      values = [login, password];
      results = await db.queryValues(query, values);
      if (results.rows.length === 1) {
        const user = results.rows[0];
        const { is_deleted, is_archived } = user;
        if (!is_deleted && !is_archived) {
          user.meta = meta;
          await queryUtils.updateTableRecord('data_users', user, {
            req,
            res,
            language,
            user,
          });
          user.token = jwt.generateToken(user);
          delete user.password;
          delete user.meta;
          res.json(user);
        } else {
          error.name = 'User data is not correct';
          error.id = 'userDatanNotCorrect';
          res.status(201);
          res.json({ error });
        }
      } else {
        error.name = 'User not found';
        error.id = 'userNotFound';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.id = 'queryError';
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  };

  const signup = async (req, res) => {
    try {
      const { data } = req.body;
      const { login, email, project } = data;
      query = 'SELECT * FROM data_users WHERE login=$1 OR email=$2';
      values = [login, email];
      results = await db.queryValues(query, values);
      if (results.rows.length === 0) {
        const mapper = ['login', 'password', 'email'].reduce((obj, key) => ({
          fields: [...obj.fields, key],
          values: [...obj.values, data[key]],
        }), { fields: [], values: [] });

        query = `INSERT INTO data_users (${mapper.fields.join(', ')}) VALUES (${mapper.fields.map((key, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
        results = await db.queryValues(query, mapper.values);
        const user = results.rows[0];

        query = 'INSERT INTO data_roles (user_id, project, access) VALUES ($1, $2, $3) RETURNING *';
        values = [user.id, project, '{"guest", "account"}'];
        await db.queryValues(query, values);

        try {
          const link = `https://${process.env.HOST}/verify?account=${jwt.generateToken({ ...user, is_confirmed: true })}`;
          req.body.data.body = req.body.data.body.replace('confirm_link', link);
          await mailer.send(req, res);
        } catch (err) {
          error.name = 'Mail error';
          error.id = 'mailError';
          error.text = JSON.stringify(err.message);
          res.json({ error });
        }
        res.status(200);
        res.send();
      } else {
        error.name = 'User exist';
        error.id = 'userExist';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.id = 'queryError';
      error.text = JSON.stringify(err.message);
      res.json({ error });
    }
  };

  const update = async (req, res) => {
    const tokenData = await jwt.verifyToken(req, res);
    if (!tokenData) return;
    try {
      const { data = null } = req.body;
      const user = await queryUtils.updateTableRecord('data_users', (data || tokenData), {
        req,
        res,
        language: 'en', 
        user: tokenData,
      });
      const token = jwt.generateToken(user);
      delete user.password;
      delete user.meta;
      res.json({ ...user, token });
    } catch (err) {
      error.name = 'Query error';
      error.id = 'queryError';
      error.text = JSON.stringify(err.message);
      res.json({ error });
    }
  };

  const reset = async (req, res) => {
    try {
      const { data } = req.body;
      query = 'SELECT * FROM data_users WHERE email=$1';
      values = [data.email];
      results = await db.queryValues(query, values);
      if (results.rows.length === 1) {
        const password = commonUtils.getStringRandom(7);
        query = 'UPDATE data_users SET password=$1 WHERE email=$2';
        values = [password, data.email];
        results = await db.queryValues(query, values);
        req.body.data.body = req.body.data.body.replace('new_password', password);
        await mailer.send(req, res);
        res.status(200);
        res.send();
      } else {
        error.name = 'User not found';
        error.id = 'userNotFound';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.id = 'queryError';
      error.text = JSON.stringify(err.message);
      res.json({ error });
    }
  };
  
  return {
    auth,
    signin,
    signup,
    update,
    reset,
  };
};

module.exports = UserController;  
