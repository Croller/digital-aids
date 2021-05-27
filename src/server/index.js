
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

app.use(express.json({ limit: '550mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));
app.use(express.static('src/server/static', { maxAge: 86400000 }));

app.use('/', mapRoutes(routes, 'src/server/api/controllers/'));
app.use('/static', express.static(path.resolve('src/server/static')));

let server = null;
if (process.env.NODE_ENV === 'development') {
  server = app.listen(process.env.LOCAL_SERVER_PORT);
} else {
  const options = {
    key: fs.readFileSync(path.resolve('src/server/cert/server.key')),
    cert: fs.readFileSync(path.resolve('src/server/cert/server.crt')),
  };
  server = https.createServer(options, app);
  server.listen(process.env.LOCAL_SERVER_PORT);
}

server.setTimeout(5100);
console.log(`env ${process.env.NODE_ENV}`);
console.log(`Server listen on port ${process.env.LOCAL_SERVER_PORT}`);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});
