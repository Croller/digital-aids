
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

const mappedRoutes = mapRoutes(routes, 'src/server/api/controllers/');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));
app.use('/', mappedRoutes);
app.use('/dist', express.static(path.resolve('dist')));
app.use('/static', express.static(path.resolve('src/server/static')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

if (process.env.NODE_ENV === 'development') {
  const server = app.listen(process.env.PORT_LOCAL_SERVER);
  server.setTimeout(5100);
} else {
  const options = {
    key: fs.readFileSync(path.resolve('cert/server.key')),
    cert: fs.readFileSync(path.resolve('cert/server.crt')),
  };
  const server = https.createServer(options, app);
  server.listen(process.env.PORT_SERVER);
}

console.log(`Server listen on port ${process.env.NODE_ENV === 'development' ? process.env.PORT_LOCAL_SERVER : process.env.PORT_SERVER}`);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});
