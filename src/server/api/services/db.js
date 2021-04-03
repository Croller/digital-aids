const { Client } = require('pg');

let CONFIG = {
  user: process.env.HOST_DB_USER,
  password: process.env.HOST_DB_PASSWORD,
  host: process.env.HOST,
  port: Number(process.env.HOST_DB_PORT),
  database: process.env.HOST_DB_DATABASE,
};

if (process.env.NODE_ENV === 'production') {
  CONFIG = {
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD,
    host: process.env.LOCAL_HOST,
    port: Number(process.env.LOCAL_DB_PORT),
    database: process.env.LOCAL_DB_DATABASE,
  };
}

const db = new Client(CONFIG);
db.connect()
  .then(() => console.log(`DataBase connected on port ${process.env.HOST_DB_PORT}`))
  .catch((err) => console.log('Connect error:', err));

module.exports = {
  query: str => new Promise((resolve, reject) => {
    db.query(str)
      .then((res) => resolve(res))
      .catch((err) => {
        const obj = { ...err, query: str };
        reject(obj);
      });
  }),
  end: () => db.end(),
};
