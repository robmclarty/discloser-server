'use strict'

exports.up = knex => {
  return knex.schema.createTable('users', t => {
    t.increments('id').primary().unsigned()
    t.string('username').unique().index()
    t.string('password')
    t.string('email').unique().index()
    t.boolean('is_admin').defaultTo(false)
    t.boolean('is_active').defaultTo(true)
    t.timestamp('login_at').defaultTo(knex.fn.now())
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = knex => {
  return knex.schema.dropTable('users')
}
