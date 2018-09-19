'use strict'

const User = require('../models/user')
const {
  createError,
  BAD_REQUEST
} = require('../helpers/error_helper')
const { isAdmin } = require('../helpers/authz_helper')

// POST /users
// **ADMIN ONLY**
// Create new users directly. This is different from "registration".
// e.g.,
// If the following was sent as inpput:
// ```
// {
//   username: 'Rob',
//   password: 'my-pass',
//   email: 'rob@email.com',
// }
// ```
const postUsers = async (req, res, next) => {
  const userInput = req.body.user

  if (!userInput) return next(createError({
    status: BAD_REQUEST,
    message: 'No input data provided'
  }))

  if (!userInput.username) return next(createError({
    status: BAD_REQUEST,
    message: '`username` is required'
  }))

  if (!userInput.password) return next(createError({
    status: BAD_REQUEST,
    message: '`password` is required'
  }))

  if (!userInput.email) return next(createError({
    status: BAD_REQUEST,
    message: '`email` is required'
  }))

  try {
    const user = await User.create(userInput)

    res.json({
      ok: true,
      message: 'User created',
      user
    })
  } catch (err) {
    next(err)
  }
}

// GET /users
// **ADMIN ONLY**
const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll()

    res.json({
      ok: true,
      message: 'Users found',
      users
    })
  } catch (err) {
    next(err)
  }
}

// GET /users/:id
// **ADMIN or OWNER ONLY**
const getUser = async (req, res, next) => {
  const userId = req.params.user_id

  try {
    const user = await User.findById(userId)

    res.json({
      ok: true,
      message: 'User found',
      user
    })
  } catch (err) {
    next(err)
  }
}

// PATCH /users/:id
// **ADMIN or OWNER ONLY**
// Admin can modify permissions, and modify user props like `isAdmin`. Regular
// requestors cannot (e.g., see `user` and `changedPermissions` ternaries).
// NOTE: Similar to the `create()` function, updating a user with an included
// `permissions` object can be used to replace any permissible actions for this
// user for the specified resources.
const patchUser = async (req, res, next) => {
  const userId = req.params.user_id
  const userInput = req.body.user

  if (!userInput) return next(createError({
    status: BAD_REQUEST,
    message: '`user` is required'
  }))

  try {
    const requesterIsAdmin = isAdmin(req)
    const user = requesterIsAdmin ?
      await User.forceUpdate(userId, userInput) :
      await User.update(userId, userInput)

    res.json({
      ok: true,
      message: 'User updated',
      user
    })
  } catch (err) {
    next(err)
  }
}

// DELETE /users/:id
// **ADMIN or OWNER ONLY**
const deleteUser = async (req, res, next) => {
  const userId = req.params.user_id

  try {
    const numUsersRemoved = await User.destroy(userId)

    res.json({
      ok: true,
      message: 'User removed',
      numUsersRemoved
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  postUsers,
  getUsers,
  getUser,
  patchUser,
  deleteUser
}
