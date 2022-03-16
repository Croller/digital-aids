const db = require('../services/db');
const jwt = require('../services/jwt');
const mailer = require('../services/mailer');
const commonUtils = require('../utils/common');
const queryUtils = require('../utils/query');

const UserController = () => {
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
    } = req.body.data;
    const meta = commonUtils.getMeta(req);

    try {
      results = await db.knex('data_users').where({ login, password });
      if (results.length === 1) {
        const user = { ...results[0], meta };
        const token = jwt.generateToken(user);
        const { is_deleted, is_archived } = user;

        if (!is_deleted && !is_archived) {
          await queryUtils.logRecord('data_users', user.id);
          await db.knex('data_users').where({ id: user.id }).update({ change_at: new Date().toISOString(), change_user: user.id }).returning('*');

          res.json({ ...user, token });
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
      const { user, mail } = req.body.data;
      const { login, email } = user;
      results = await db.knex('data_users').where({ login, email });

      if (results.length === 0) {
        results = await db.knex('data_users').insert(user).returning('*');
        const created = results[0]; 
        await db.knex('data_roles').insert({ user_id: created.id, access: ['guest', 'account'] });

        try {
          const link = `https://${process.env.HOST}/verify?account=${jwt.generateToken({ ...created, is_confirmed: true })}`;
          mail.body = mail.body.replace('confirm_link', link);
          results = await mailer.send({ ...mail, to: email });
          res.json(results);
        } catch (err) {
          await db.knex('data_users').where({ id: created.id }).del();
          await db.knex('data_roles').where({ user_id: created.id }).del();
          res.status(201);
          res.json(commonUtils.setError('mailError', 'Mail error', JSON.stringify(err.message)));
          return;
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
        const { data } = req.body;
        const meta = commonUtils.getMeta(req);
        await queryUtils.logRecord('data_users', tokenData.id);
        results = await db.knex('data_users').where({ id: tokenData.id }).update({ ...data, meta }).returning('*');
        const updated = results[0];
        const token = jwt.generateToken(updated);
        delete updated.password;
        res.json({ ...updated, token });
      } catch (err) {
        res.status(201);
        res.json(commonUtils.setError('queryError', 'Query error', JSON.stringify(err.message)));
      }
    } else {
      res.status(201);
      res.json(commonUtils.setError('userUpdateError', 'User update error'));
    }
  };

  const reset = async (req, res) => {
    try {
      const { user, mail } = req.body.data;
      const { email } = user;
      results = await db.knex('data_users').where({ email });

      if (results.length === 1) {
        await queryUtils.logRecord('data_users', results[0].id);
        const password = commonUtils.getRandomString(7);
        results = await db.knex('data_users').where({ email }).update({ password }).returning('*');
        mail.body = mail.body.replace('new_password', password);
        await mailer.send({ ...mail, to: email });
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
