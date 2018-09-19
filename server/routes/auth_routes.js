'use strict'

const router = require('express').Router()
const cred = require('../cred')
const {
  postAuth,
  refreshAuth,
  deleteAuth,
  postRegister
} = require('../controllers/auth_controller')

router.route('/auth')
  .post(cred.authenticate('basic'), postAuth)
  .delete(cred.requireRefreshToken, deleteAuth)

router.route('/auth/refresh')
  .post(cred.requireRefreshToken, refreshAuth)

router.route('/register')
  .post(postRegister)

module.exports = router
