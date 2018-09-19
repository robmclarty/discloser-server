'use strict'

const Message = require('../models/message')

const postMessages = async (req, res, next) => {
  const userId = req.body.userId
  const data = req.body.data
  const mac = req.body.mac

  try {
    const message = await Message.create({
      userId,
      data,
      mac
    })

    res.json({
      ok: true,
      message: 'Message created',
      userId: message.userId,
      createdAt: message.createdAt
    })
  } catch (err) {
    next(err)
  }
}

const getMessages = async (req, res, next) => {
  //const userId = req.parmas.user_id

  try {
    const messages = await Message.findAll()

    res.json({
      ok: true,
      message: 'Messages found',
      messages
    })
  } catch (err) {
    next(err)
  }
}

const getMessage = (req, res, next) => {
  const messageId = req.params.id

  Message.findById(messageId)
    .then(message => res.json({
      ok: true,
      message: 'Message found',
      msg
    }))
    .catch(next)
}

const putMessage = (req, res, next) => {
  const messageId = req.params.id
  const props = req.body.message

  Message.update(messageId, props)
    .then(message => res.json({
      ok: true,
      message: 'Message updated',
      msg
    }))
    .catch(next)
}

const deleteMessage = (req, res, next) => {
  const messageId = req.params.id

  Message.destroy(messageId)
    .then(deleteCount => res.json({
      ok: true,
      message: 'Message deleted',
      deleteCount
    }))
    .catch(next)
}

module.exports = {
  postMessages,
  getMessages,
  getMessage,
  putMessage,
  deleteMessage
}
