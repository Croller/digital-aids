const { Client } = require('pg');

const CONFIG = {
  user: process.env.HOST_DB_USER,
  password: process.env.HOST_DB_PASSWORD,
  host: process.env.HOST,
  port: Number(process.env.HOST_DB_PORT),
  database: process.env.HOST_DB_DATABASE,
};

if (process.env.NODE_ENV === 'production') {
  CONFIG.user = process.env.LOCAL_DB_USER;
  CONFIG.password = process.env.LOCAL_DB_PASSWORD;
  CONFIG.host = process.env.LOCAL_DB_HOST;
  CONFIG.port = Number(process.env.LOCAL_DB_PORT);
  CONFIG.database = process.env.LOCAL_DB_DATABASE;
}

const db = new Client(CONFIG);
db.connect()
  .then(() => console.log(`DataBase connected on port ${process.env.HOST_DB_PORT}`))
  .catch((err) => console.log('Connect error:', err));

module.exports = {
  query: str => new Promise((resolve, reject) => {
    console.log('DataBase query: ', str);
    db.query(str)
      .then((res) => resolve(res))
      .catch((err) => {
        console.log('DataBase query error: ', err);
        reject(new Error({ ...err }));
      });
  }),
  queryValues: (str, values) => new Promise((resolve, reject) => {
    console.log('DataBase query: ', str, values);
    db.query(str, values)
      .then((res) => resolve(res))
      .catch((err) => {
        console.log('DataBase query error: ', err);
        reject(new Error({ ...err }));
      });
  }),
  end: () => db.end(),
};
