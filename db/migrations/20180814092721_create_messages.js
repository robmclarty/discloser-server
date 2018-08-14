'use strict'

exports.up = knex => {
  return knex.schema.createTable('messages', t => {
    t.increments('id').primary().unsigned()
    t.integer('user_id').references('users.id').unsigned().index().onDelete('CASCADE')
    t.text('data')
    t.text('mac')
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = knex => {
  return knex.schema.dropTable('messages')
}
