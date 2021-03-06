'use strict'

// Map flat env vars to more organized js object.
module.exports = {
  port: process.env.PORT,
  name: process.env.APP_NAME,
  issuer: process.env.ISSUER,
  origin: process.env.ORIGIN,
  cred: {
    accessPrivKey: process.env.CRED_ACCESS_PRIVATE_KEY,
    accessPubKey: process.env.CRED_ACCESS_PUBLIC_KEY,
    accessExpiresIn: process.env.CRED_ACCESS_EXPIRES_IN,
    refreshSecret: process.env.CRED_REFRESH_SECRET,
    refreshExpiresIn: process.env.CRED_REFRESH_EXPIRES_IN,
    resetSecret: process.env.CRED_RESET_SECRET
  },
  logger: {
    level: process.env.LOG_LEVEL || 'warn'
  }
}
