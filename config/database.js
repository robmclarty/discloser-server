'use strict'

// Loading `knexfile.js` from root rather than defining it here so that knex cli
// functions will be able to find the config in the expected default location to
// make things a bit easier. The app itself loads this `database.js` file which
// routes the env to the appropriate db config in the knexfile.
const knexfile = require('../knexfile')
const env = process.env.NODE_ENV || 'development'
const knex = require('knex')(knexfile[env])

module.exports = knex
