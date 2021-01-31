require("dotenv").config()
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();

// use cors
// let {CORS = "" } = process.env

// app.use( cors( CORS.split("|") ) )
// console.log(`\nCORS enabled:\n${CORS.split("|").join("\n")}\n`)

// parse request body
app.use( bodyParser.json() )

// get routes list
const routes = require("./config/routes.json")

// autoimport routes
routes.map( route => { console.debug("importing routes:", route.route ); app.use( `/${route.route}`, require(`./routes/${route.route}`)) } )
// routes.map( route => api.use( `/${route.route}`, require(`./routes/${route.route}`)))


app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true, limit: '1550mb' }));
app.use(bodyParser.json({ limit: '1550mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.listen(process.env.HTTPS_PORT || process.env.PORT_LOCAL_SERVER, () => console.log(`success: listen port ${process.env.HTTPS_PORT || process.env.PORT_LOCAL_SERVER}`));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});