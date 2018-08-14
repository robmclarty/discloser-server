'use strict'

const router = require('express').Router()
const {
  postMessages,
  getMessages,
  getMessage,
  putMessage,
  deleteMessage
} = require('../controllers/message_controller')

router.route('/messages')
  .post(postMessages)
  .get(getMessages)

router.route('/messages/:id')
  .get(getMessage)
  .put(putMessage)
  .delete(deleteMessage)

module.exports = router
