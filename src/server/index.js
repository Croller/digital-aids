
const express = require('express');
const path = require('path');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const routes = require('./api/routes');

require('dotenv').config({
  path: path.resolve('.env'),
});

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Request-Method', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Accept, Authorization, Origin');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use('/', mapRoutes(routes, 'src/server/api/controllers/'));
app.use('/dist', express.static(path.resolve('dist')));
app.use('/static', express.static(path.resolve('src/server/static')));

if (process.env.NODE_ENV === 'development') {
  const server = app.listen(process.env.LOCAL_SERVER_PORT);
  server.setTimeout(5100);
} else {
  const options = {
    key: fs.readFileSync(path.resolve('src/server/cert/server.key')),
    cert: fs.readFileSync(path.resolve('src/server/cert/server.crt')),
  };
  const server = https.createServer(options, app);
  server.listen(process.env.HOST_SERVER_PORT);
}

console.log(`Server listen on port ${process.env.NODE_ENV === 'development' ? process.env.LOCAL_SERVER_PORT : process.env.HOST_SERVER_PORT}`);

console.log('app path', path.resolve('dist/index.html'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
  res.sendFile(path.join(`${__dirname.split('/').slice(0, __dirname.split('/').length - 2).join('/')}/dist/index.html`));
});
