
const express = require('express');
const path = require('path');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
// const https = require('https');
// const fs = require('fs');
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

app.use('/', mapRoutes(routes, 'src/server/api/controllers/'));
app.use('/dist', express.static(path.resolve('dist')));
app.use('/static', express.static(path.resolve('src/server/static')));

if (process.env.NODE_ENV === 'development') {
  const server = app.listen(process.env.LOCAL_SERVER_PORT);
  server.setTimeout(5100);
} else {
  // const options = {
  //   key: fs.readFileSync(path.resolve('src/server/cert/server.key')),
  //   cert: fs.readFileSync(path.resolve('src/server/cert/server.crt')),
  // };
  // const server = https.createServer(options, app);
  // server.listen(process.env.HOST_SERVER_PORT);
  
  const server = app.listen(process.env.PORT || process.env.HOST_SERVER_PORT);
  server.setTimeout(5100);
}

console.log(`Server listen on port ${process.env.NODE_ENV === 'development' ? process.env.LOCAL_SERVER_PORT : (process.env.PORT || process.env.HOST_SERVER_PORT)}`);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});
