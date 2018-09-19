'use strict'

const {
  createError,
  UNAUTHORIZED
} = require('../helpers/error_helper')
const {
  isOwner,
  isAdmin
} = require('../helpers/authz_helper')

// NOTE: If user is an "admin" user, they are also considered an "owner".
const requireOwner = (req, res, next) => {
  if (!isAdmin(req) && !isOwner(req)) return next(createError({
    status: UNAUTHORIZED,
    message: 'You are not authorized to access this resource'
  }))

  next()
}

const requireAdmin = (req, res, next) => {
  if (!isAdmin(req)) return next(createError({
    status: UNAUTHORIZED,
    message: 'You are not authrorized to access this resource'
  }))

  next()
}

module.exports = {
  requireAdmin,
  requireOwner
}
