const moment = require('moment');
const geoip = require('geoip-lite');
const db = require('../services/db');
const jwt = require('../services/jwt');
const commonUtils = require('../utils/common');

const error = {
  code: 0,
  name: '',
  text: '',
};

const UserController = () => {
  let query = '';
  let values = [];

  const signin = async (req, res) => {
    const {
      login,
      password,
      browser = null,
    } = req.body;

    let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    ip = ip.replace('::ffff:', '');
    const geo = geoip.lookup(commonUtils.nodeEnv() ? ip : '83.220.237.49');
    const meta = JSON.stringify({ ip, browser, geo });

    try {
      query = 'SELECT * FROM data_users WHERE login=$1 AND password=$2';
      values = [login, password];
      const result = await db.queryValues(query, values);
      if (result.rows.length === 1) {
        query = 'UPDATE data_users SET enter_at=$1, meta=$4 WHERE login=$2 AND password=$3';
        values = [moment().format('YYYY-MM-DDTHH:mm:ss.SSS'), login, password, meta];
        await db.queryValues(query, values);
        const user = result.rows[0];
        const token = jwt.generateToken(user);
        delete user.password;
        delete user.meta;
        res.json({ ...user, token, enter_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSS') });
      } else {
        error.name = 'User not found';
        error.code = 'userNotFound';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Query error';
      error.code = 'queryError';
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  };

  const auth = async (req, res) => {
    try {
      const tokenData = await jwt.verifyToken(req, res);
      if (tokenData) {
        req.body = tokenData;
        UserController().signin(req, res);
      } else {
        error.name = 'Token not valid';
        error.code = 'tokenNotValid';
        res.status(201);
        res.json({ error });
      }
    } catch (err) {
      error.name = 'Token not valid';
      error.code = 'tokenNotValid';
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  };

  // const create = async (req, res) => {
  //   try {
  //     const { data } = req.body;
  //     if (data.role !== 1) {
  //       const check = await db.query(`SELECT * FROM data_users WHERE login='${data.login}' OR email='${data.email}'`);
  //       if (check.rows.length === 0) {
  //         delete data.id;
  //         data.enter_at = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  //         const query = Object.keys(data).reduce((obj, key) => ({
  //           fields: [...obj.fields, key],
  //           values: [...obj.values, data[key]],
  //         }), { fields: [], values: [] });
  //         const newUser = await db.query(`INSERT INTO data_users (${query.fields.join(', ')}) VALUES ('${query.values.join('\', \'')}') RETURNING *`);
  //         res.json(newUser.rows[0]);
  //       } else {
  //         error.name = 'Create user error';
  //         error.text = 'Same user already exist';
  //         res.status(201);
  //         res.json({ error });
  //       }
  //     } else {
  //       error.name = 'Permition error';
  //       error.text = 'User create is same role of admin or not valid token';
  //       res.status(201);
  //       res.json({ error });
  //     }
  //   } catch (err) {
  //     error.name = 'Query error';
  //     error.text = JSON.stringify(err.message);
  //     res.status(201);
  //     res.json({ error });
  //   }
  // };
  
  // const update = async (req, res) => {
  //   try {
  //     const { data } = req.body;
  //     const user = await jwt.verifyToken(req, res);
  //     if (user && (user.role === 1 || data.id === user.id)) {
  //       const { id } = { ...data };
  //       const check = await db.query(`SELECT * FROM data_users WHERE id='${id}'`);
  //       if (check.rows.length === 1) {
  //         delete data.id;
  //         data.enter_at = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  //         const query = Object.keys(data).map(key => (`${key}='${data[key]}'`));
  //         const upadateUser = await db.query(`UPDATE data_users SET ${query.join(', ')} WHERE id='${id}' RETURNING *`);
  //         res.json(upadateUser.rows[0]);
  //       } else {
  //         error.name = 'Update user error';
  //         error.text = 'This user does not exist';
  //         res.status(201);
  //         res.json({ error });
  //       }
  //     } else {
  //       error.name = 'Permition error';
  //       error.text = 'May be you are not role with admin or you try edit another account witch not your';
  //       res.status(201);
  //       res.json({ error });
  //     }
  //   } catch (err) {
  //     error.name = 'Query error';
  //     error.text = JSON.stringify(err.message);
  //     res.status(201);
  //     res.json({ error });
  //   }
  // };

  // const remove = async (req, res) => {
  //   try {
  //     const { data } = req.body;
  //     const user = await jwt.verifyToken(req, res);
  //     if (user && (user.role === 1 || data.id === user.id)) {
  //       const { id } = { ...data };
  //       const check = await db.query(`SELECT * FROM data_users WHERE id='${id}'`);
  //       if (check.rows.length === 1) {
  //         await db.query(`DELETE FROM data_users WHERE id='${id}'`);
  //         res.json({});
  //       } else {
  //         error.name = 'Update user error';
  //         error.text = 'This user does not exist';
  //         res.status(201);
  //         res.json({ error });
  //       }
  //     } else {
  //       error.name = 'Permition error';
  //       error.text = 'May be you are not role with admin or you try edit another account witch not your';
  //       res.status(201);
  //       res.json({ error });
  //     }
  //   } catch (err) {
  //     error.name = 'Query error';
  //     error.text = JSON.stringify(err.message);
  //     res.status(201);
  //     res.json({ error });
  //   }
  // };
  
  return {
    signin,
    auth,
    // create,
    // update,
    // remove,
  };
};

module.exports = UserController;  
