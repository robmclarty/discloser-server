'use strict'

const createGuts = require('../helpers/model_guts')

const name = 'Message'
const tableName = 'messages'

const selectableProps = [
  'id',
  'user_id',
  'data',
  'mac',
  'updated_at',
  'created_at'
]

module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps
  })

  return {
    ...guts
  }
}
