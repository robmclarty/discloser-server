'use strict'

const {
  createError,
  NOT_FOUND
} = require('../helpers/error_helper')
const crypto = require('crypto')
const Key = require('../models/key')

const postKeys = async (req, res, next) => {
  const userId = req.params.user_id
  const name = req.body.name
  const data = req.body.data

  // Create a fingerprint of the key data (a sha-256 hash).
  // TODO: move this to a beforeSave() function in model
  const hash = crypto.createHash('sha256')
  hash.update(data)
  const fingerprint = hash.digest('hex')

  try {
    const key = await Key.create({
      userId,
      name,
      data,
      fingerprint
    })

    res.json({
      ok: true,
      message: 'Key created',
      key
    })
  } catch (err) {
    next(err)
  }
}

const getKeys = async (req, res, next) => {
  const userId = req.params.user_id

  try {
    const keys = await Key.find({ userId })

    res.json({
      ok: true,
      message: 'Keys found',
      keys
    })
  } catch (err) {
    next(err)
  }
}

const getKey = async (req, res, next) => {
  const userId = req.params.user_id
  const keyId = req.params.id

  try {
    const key = await Key.findOne({
      id: keyId,
      userId
    })

    res.json({
      ok: true,
      message: 'Key found',
      key
    })
  } catch (err) {
    next(err)
  }
}

const patchKey = async (req, res, next) => {
  const userId = req.params.user_id
  const keyId = req.params.id
  const name = req.body.name
  const data = req.body.data
  let fingerprint = null

  if (data) {
    // Create a fingerprint of the key data (a sha-256 hash).
    // TODO: move this to a beforeSave() function in model
    const hash = crypto.createHash('sha256')
    hash.update(data)
    fingerprint = hash.digest('hex')
  }

  try {
    const key = await Key.findOne({
      id: keyId,
      userId
    })

    if (!key) throw createError({
      status: NOT_FOUND,
      message: `No key found with userId '${ userId }' and id '${ keyId }'`
    })

    const updatedKey = await Key.update(keyId, {
      name: name || key.name,
      data: data || key.data,
      fingerprint: fingerprint || key.fingerprint
    })

    res.json({
      ok: true,
      message: 'Key updated',
      key: updatedKey
    })
  } catch (err) {
    next(err)
  }
}

const deleteKey = async (req, res, next) => {
  const userId = req.params.user_id
  const keyId = req.params.id

  try {
    const key = await Key.findOne({
      id: keyId,
      userId
    })

    if (!key) throw createError({
      status: NOT_FOUND,
      message: `No key found with userId '${ userId }' and id '${ keyId }'`
    })

    const deleteCount = await Key.destroy(keyId)

    res.json({
      ok: true,
      message: 'Key removed',
      deleteCount
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  postKeys,
  getKeys,
  getKey,
  patchKey,
  deleteKey
}
