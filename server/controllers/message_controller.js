'use strict'

const {
  createError,
  NOT_FOUND
} = require('../helpers/error_helper')
const Message = require('../models/message')

const postMessages = async (req, res, next) => {
  const userId = req.params.user_id
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
  const userId = req.parmas.user_id

  try {
    const messages = await Message.find({ userId })

    res.json({
      ok: true,
      message: 'Messages found',
      messages
    })
  } catch (err) {
    next(err)
  }
}

const getMessage = async (req, res, next) => {
  const userId = req.params.user_id
  const messageId = req.params.id

  try {
    const msg = await Message.findOne({
      id: messageId,
      userId
    })

    res.json({
      ok: true,
      message: 'Message found',
      msg
    })
  } catch (err) {
    next(err)
  }
}

const patchMessage = async (req, res, next) => {
  const userId = req.params.user_id
  const messageId = req.params.id
  const props = req.body.message

  try {
    const msg = await Message.findOne({
      id: messageId,
      userId
    })

    if (!msg) throw createError({
      status: NOT_FOUND,
      message: `No message found with userId '${ userId }' and id '${ messageId }'`
    })

    const updatedMsg = await Message.update(messageId, props)

    res.json({
      ok: true,
      message: 'Message updated',
      msg: updatedMsg
    })
  } catch (err) {
    next(err)
  }
}

const deleteMessage = async (req, res, next) => {
  const userId = req.params.user_id
  const messageId = req.params.id

  try {
    const msg = await Message.findOne({
      id: messageId,
      userId
    })

    if (!msg) throw createError({
      status: NOT_FOUND,
      message: `No message found with userId '${ userId }' and id '${ messageId }'`
    })

    const deleteCount = await Message.destroy(messageId)

    res.json({
      ok: true,
      message: 'Message deleted',
      deleteCount
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  postMessages,
  getMessages,
  getMessage,
  patchMessage,
  deleteMessage
}
