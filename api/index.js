require("dotenv").config()
const api = require("express")()
const https = require('@skng/https-server')
const parser = require("body-parser")
const cors = require("cors")

// use cors
let {CORS = "" } = process.env

api.use( cors( CORS.split("|") ) )
console.log(`\nCORS enabled:\n${CORS.split("|").join("\n")}\n`)

// parse request body
api.use( parser.json() )

// get routes list
const routes = require("./config/routes.json")

// autoimport routes
routes.map( route => api.use( `/${route.route}`, require(`./routes/${route.route}`)))

https(api).catch( e => console.log( e ) )