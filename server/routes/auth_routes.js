'use strict'

const router = require('express').Router()
const {
  login,
  logout,
  register,
  refreshTokens
} = require('../controllers/auth_controller')

router.route('/auth')
  .post(login)
  .put(refreshTokens)
  .delete(logout)

router.route('/register')
  .post(register)

module.exports = router
