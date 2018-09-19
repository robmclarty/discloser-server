'use strict'

const { readFileSync } = require('fs')
const gotCred = require('cred')
const config = require('../config/server')
const User = require('./models/user')

const cred = gotCred({
  resource: config.name,
  issuer: config.issuer,
  accessOpts: {
    privateKey: readFileSync(config.cred.accessPrivKey),
    publicKey: readFileSync(config.cred.accessPubKey),
    expiresIn: config.cred.accessExpiresIn,
    algorithm: config.cred.accessAlg
  },
  refreshOpts: {
    secret: config.cred.refreshSecret,
    expiresIn: config.cred.refreshExpiresIn,
    algorithm: config.cred.refreshAlg
  }
})

const tokenPayload = async user => {
  return {
    aud: config.issuer,
    userId: user.id,
    isAdmin: user.isAdmin
  }
}

cred.use('basic', async req => {
  const username = String(req.body.username)
  const password = String(req.body.password)
  const aud = String(req.body.aud || config.aud)

  if (!username && !email) throw '`username` is required'
  if (!password) throw '`password` is required'

  const user = await User.verify(username, password)
    .then(u => User.loginUpdate(u.id))

  return tokenPayload(user)
})

module.exports = cred
