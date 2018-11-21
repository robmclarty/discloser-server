'use strict'

const router = require('express').Router()
const { requireOwner } = require('../middleware/authz_middleware')
const {
  postMessages,
  getMessages,
  getMessage,
  patchMessage,
  deleteMessage
} = require('../controllers/message_controller')

router.route('/users/:user_id/messages')
  //.all(requireOwner)
  .post(postMessages)
  .get(getMessages)

router.route('/users/:user_id/messages/:id')
  //.all(requireOwner)
  .get(getMessage)
  .patch(patchMessage)
  .delete(deleteMessage)

module.exports = router
