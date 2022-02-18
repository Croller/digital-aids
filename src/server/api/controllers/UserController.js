const db = require('../services/db');
const jwt = require('../services/jwt');
const mailer = require('../services/mailer');
const commonUtils = require('../utils/common');

const UserController = () => {
  let results = '';

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
        const { is_deleted, is_archived } = user;
        if (!is_deleted && !is_archived) {
          const token = jwt.generateToken(user);
          res.json({ ...user, token });

          await db.knex('logs_users').insert(user);
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

        await db.knex('data_roles').insert({ user_id: created.id, access: ['guest', 'account'] }).select();
        try {
          const link = `https://${process.env.HOST}/verify?account=${jwt.generateToken({ ...created, is_confirmed: true })}`;
          mail.body = mail.body.replace('confirm_link', link);

          results = await mailer.send({ ...mail, to: email });
          res.json(results);
        } catch (err) {
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
    const { data } = req.body;
    if (tokenData && data.id) {
      try {
        results = await db.knex('data_users').where({ id: data.id }).update(data).returning('*');
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
        const password = commonUtils.getStringRandom(7);
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
