'use strict'

const TABLE_NAME = 'keys'

const SELECTABLE_FIELDS = [
  'id',
  'userId',
  'name',
  'data',
  'fingerprint',
  'createdAt',
  'updatedAt'
]

const queries = require('../helpers/query_helper')(TABLE_NAME, SELECTABLE_FIELDS)

module.exports = {
  tableName: TABLE_NAME,
  fields: SELECTABLE_FIELDS,
  ...queries
}
