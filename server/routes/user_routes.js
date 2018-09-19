'use strict'

const router = require('express').Router()
const {
  requireAdmin,
  requireOwner
} = require('../middleware/authz_middleware')
const {
  postUsers,
  getUsers,
  getUser,
  patchUser,
  deleteUser
} = require('../controllers/user_controller')

router.route('/users')
  .post(requireAdmin, postUsers)
  .get(requireAdmin, getUsers)

router.route('/users/:id')
  .get(requireOwner, getUser)
  .patch(requireOwner, patchUser)
  .delete(requireOwner, deleteUser)

module.exports = router
