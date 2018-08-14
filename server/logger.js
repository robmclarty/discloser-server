'use strict'

const Logger = require('js-logger')
const config = require('../config/server')

// Map custom string values that will be stored in env vars to Logger constants.
const getLogLevelFromConfig = str => {
  switch (str) {
  case 'warn':
    return Logger.WARN
  case 'debug':
    return Logger.DEBUG
  case 'info':
    return Logger.INFO
  case 'error':
    return Logger.ERROR
  case 'verbose':
    return Logger.TRACE
  case 'time':
    return Logger.TIME
  case 'off':
    return Logger.OFF
  default:
    return Logger.WARN
  }
}

// Configure Logger.
Logger.useDefaults()
Logger.setLevel(getLogLevelFromConfig(config.logger.level))

// Wrap Logger object to make a common interface for the rest of the app in case
// we want to swap this logging module out for a different one, we simply need
// to maintain the following API.
// Modify these functions here to integrate logs with other systems (e.g., to
// store them differently or parse them or something.
const wrapper = {
  warn: Logger.warn,
  debug: Logger.debug,
  info: Logger.info,
  error: Logger.error,
  trace: Logger.trace,
  time: Logger.time,
  off: Logger.off
}

module.exports = {
  logger: wrapper
}
