'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cred = require('./cred')

const app = express()

app.use(bodyParser.json())
app.disable('x-powered-by')

app.use('/', [
  require('./routes/auth_routes')
])

app.use('/', [
  cred.requireAccessToken,
  require('./routes/key_routes'),
  require('./routes/user_routes'),
  require('./routes/message_routes')
])

app.use(require('./middleware/error_middleware').all)

module.exports = app
