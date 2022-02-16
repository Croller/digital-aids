const db = require('../services/db');
const jwt = require('../services/jwt');
const mailer = require('../services/mailer');
const queryUtils = require('../utils/query');
const commonUtils = require('../utils/common');

const UserController = () => {
  let query = '';
  let values = [];
  let results = null;

  const auth = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    if (tokenData) {
      req.body.data = tokenData;
      UserController().signin(req, res);
    } else {
      res.status(201);
      res.json(commonUtils.setError('authError', 'Auth error'));
    }
  };

  const signin = async (req, res) => {
    const {
      login,
      password,
      language = 'en',
      browser = {},
    } = req.body.data;
    const meta = JSON.stringify({ ...commonUtils.getGeoIP(req), browser });

    try {
      query = 'SELECT * FROM data_users WHERE login=$1 AND password=$2';
      results = await db.queryValues(query, [login, password]);
      
      if (results.rows.length === 1) {
        const user = results.rows[0];
        const { is_deleted, is_archived } = user;
        if (!is_deleted && !is_archived) {
          await queryUtils.updateTableRecord('data_users', { ...user, meta }, {
            req,
            res,
            language,
            user,
          });
          user.token = jwt.generateToken(user);
          delete user.password;
          res.json(user);
        } else {
          res.status(201);
          res.json(commonUtils.setError('userDatanNotCorrect', 'User data is not correct'));
        }
      } else {
        res.status(201);
        res.json(commonUtils.setError('userNotFound', 'User not found'));
      }
    } catch (err) {
      res.status(201);
      res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
    }
  };

  const signup = async (req, res) => {
    try {
      const { data } = req.body;
      const { login, email, project } = data;
      query = 'SELECT * FROM data_users WHERE login=$1 OR email=$2';
      results = await db.queryValues(query, [login, email]);

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
          res.json(commonUtils.setError());
        } catch (err) {
          res.status(201);
          res.json(commonUtils.setError('mailError', 'Mail error', JSON.stringify(err.message)));
        }
      } else {
        res.status(201);
        res.json(commonUtils.setError('userExist', 'User exist'));
      }
    } catch (err) {
      res.status(201);
      res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
    }
  };

  const update = async (req, res) => {
    const tokenData = await jwt.verifyToken(req);
    if (tokenData) {
      try {
        const { data = null } = req.body;
        const user = await queryUtils.updateTableRecord('data_users', data || tokenData, {
          req,
          res,
          language: 'en', 
          user: tokenData.user,
        });
        const token = jwt.generateToken(user);
        delete user.password;
        delete user.meta;
        res.json({ ...user, token });
      } catch (err) {
        res.status(201);
        res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('authError', 'Auth error'));
    }
  };

  const reset = async (req, res) => {
    try {
      const { email } = req.body.data;
      query = 'SELECT * FROM data_users WHERE email=$1';
      results = await db.queryValues(query, [email]);

      if (results.rows.length === 1) {
        const password = commonUtils.getStringRandom(7);
        query = 'UPDATE data_users SET password=$1 WHERE email=$2';
        results = await db.queryValues(query, [password, email]);

        req.body.data.body = req.body.data.body.replace('new_password', password);
        await mailer.send(req, res);
        res.json(commonUtils.setError());
      } else {
        res.status(201);
        res.json(commonUtils.setError('userNotFound', 'User not found'));
      }
    } catch (err) {
      res.status(201);
      res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
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
