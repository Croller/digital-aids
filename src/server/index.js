
const express = require('express');
const path = require('path');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');
const routes = require('./api/routes');
const socket = require('./api/services/socket');

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
  server = http.createServer(app);
} else {
  const options = {
    key: fs.readFileSync(path.resolve('src/server/cert/server.key')),
    cert: fs.readFileSync(path.resolve('src/server/cert/server.crt')),
  };
  server = https.createServer(options, app);
}

socket.create(server);

server.listen(process.env.LOCAL_SERVER_PORT);
server.setTimeout(5100);

console.log(`Env mode: ${process.env.NODE_ENV}`);
console.log(`Server listen on port: ${process.env.LOCAL_SERVER_PORT}`);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});
