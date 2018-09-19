'use strict'

const router = require('express').Router()
const { requireOwner } = require('../middleware/authz_middleware')
const {
  postKeys,
  getKeys,
  getKey,
  patchKey,
  deleteKey
} = require('../controllers/key_controller')

router.route('/users/:user_id/keys')
  .all(requireOwner)
  .post(postKeys)
  .get(getKeys)

router.route('/users/:user_id/keys/:id')
  .all(requireOwner)
  .get(getKey)
  .patch(patchKey)
  .delete(deleteKey)

module.exports = router
