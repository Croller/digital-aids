require("dotenv").config({path: __dirname + '/.env'})
var fs = require('fs');
var https = require('https');
const api = require("express")()
const parser = require("body-parser")
const cors = require("cors")

var privateKey  = fs.readFileSync(__dirname + '/cert/server.key', 'utf8');
var certificate = fs.readFileSync(__dirname + '/cert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpsServer = https.createServer(credentials, api);



// use cors
let {CORS = "" } = process.env

console.log(process.env.AUTH_JWT_KEY)

api.use( cors( CORS.split("|") ) )
console.log(`\nCORS enabled:\n${CORS.split("|").join("\n")}\n`)

// parse request body
api.use( parser.json() )

// get routes list
const routes = require("./config/routes.json")

// autoimport routes
routes.map( route => { console.debug("importing routes:", route.route ); api.use( `/${route.route}`, require(`./routes/${route.route}`)) } )
// routes.map( route => api.use( `/${route.route}`, require(`./routes/${route.route}`)))

httpsServer.listen(8800)