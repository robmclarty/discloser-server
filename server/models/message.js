'use strict'

const TABLE_NAME = 'messages'

const SELECTABLE_FIELDS = [
  'id',
  'userId',
  'data',
  'mac',
  'createdAt',
  'updatedAt'
]

const queries = require('../helpers/query_helper')(TABLE_NAME, SELECTABLE_FIELDS)

module.exports = {
  tableName: TABLE_NAME,
  fields: SELECTABLE_FIELDS,
  ...queries
}
