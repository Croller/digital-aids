import moment from 'moment';

const db = require('../services/db');
const jwt = require('../services/jwt');

const error = {
  name: '',
  code: 0,
  text: '',
};

const UserController = () => {
  const signin = async (req, res) => {
    const {
      login,
      password,
    } = req.body.data;
    try {
      const result = await db.query(`SELECT * FROM data_users WHERE login='${login}' AND password='${password}'`);
      if (result.rows.length === 1) {
        await db.query(`UPDATE data_users SET enter_at='${moment().format('YYYY-MM-DDTHH:mm:ss.SSS')}' WHERE login='${login}' AND password='${password}'`);
        const user = result.rows[0];
        const token = jwt.generateToken(user);
        delete user.password;
        res.json({ ...user, token });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const auth = async (req, res) => {
    try {
      const user = await jwt.verifyToken(req, res);
      if (user) {
        const result = await db.query(`SELECT * FROM data_users WHERE login='${user.login}' AND password='${user.password}'`);
        if (result.rows.length === 1) {
          const token = jwt.generateToken(result.rows[0]);
          delete user.password;
          res.json({ ...user, token });
        } else {
          error.name = 'User error';
          error.text = 'User does not exist';
          res.json({ error });
        }
      } else {
        error.name = 'Token error';
        error.text = 'Token not valid';
        res.json({ error });
      }
    } catch {
      error.name = 'Token error';
      error.text = 'Cant get token';
      res.json({ error });
    }
  };

  const create = async (req, res) => {
    try {
      const { data } = req.body;
      if (data.role !== 1) {
        const check = await db.query(`SELECT * FROM data_users WHERE login='${data.login}' OR email='${data.email}'`);
        if (check.rows.length === 0) {
          delete data.id;
          data.enter_at = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
          const query = Object.keys(data).reduce((obj, key) => ({
            fields: [...obj.fields, key],
            values: [...obj.values, data[key]],
          }), { fields: [], values: [] });
          const newUser = await db.query(`INSERT INTO data_users (${query.fields.join(', ')}) VALUES ('${query.values.join('\', \'')}') RETURNING *`);
          res.json(newUser.rows[0]);
        } else {
          error.name = 'Create user error';
          error.text = 'Same user already exist';
          res.json({ error });
        }
      } else {
        error.name = 'Permition error';
        error.text = 'User create is same role of admin or not valid token';
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const update = async (req, res) => {
    try {
      const { data } = req.body;
      const user = await jwt.verifyToken(req, res);
      if (user && (user.role === 1 || data.id === user.id)) {
        const { id } = { ...data };
        const check = await db.query(`SELECT * FROM data_users WHERE id='${id}'`);
        if (check.rows.length === 1) {
          delete data.id;
          data.enter_at = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
          const query = Object.keys(data).map(key => (`${key}='${data[key]}'`));
          const upadateUser = await db.query(`UPDATE data_users SET ${query.join(', ')} WHERE id='${id}' RETURNING *`);
          res.json(upadateUser.rows[0]);
        } else {
          error.name = 'Update user error';
          error.text = 'This user does not exist';
          res.json({ error });
        }
      } else {
        error.name = 'Permition error';
        error.text = 'May be you are not role with admin or you try edit another account witch not your';
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };

  const remove = async (req, res) => {
    try {
      const { data } = req.body;
      const user = await jwt.verifyToken(req, res);
      if (user && (user.role === 1 || data.id === user.id)) {
        const { id } = { ...data };
        const check = await db.query(`SELECT * FROM data_users WHERE id='${id}'`);
        if (check.rows.length === 1) {
          await db.query(`DELETE FROM data_users WHERE id='${id}'`);
          res.json({});
        } else {
          error.name = 'Update user error';
          error.text = 'This user does not exist';
          res.json({ error });
        }
      } else {
        error.name = 'Permition error';
        error.text = 'May be you are not role with admin or you try edit another account witch not your';
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.text = JSON.stringify(err);
      res.json({ error });
    }
  };
  
  return {
    signin,
    auth,
    create,
    update,
    remove,
  };
};

export default UserController;
