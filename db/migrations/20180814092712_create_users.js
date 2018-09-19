'use strict'

exports.up = knex => {
  return knex.schema.createTable('users', t => {
    t.increments('id').primary().unsigned()
    t.string('username').unique().index()
    t.string('password')
    t.string('email').unique().index()
    t.boolean('isAdmin').defaultTo(false)
    t.boolean('isActive').defaultTo(true)
    t.timestamp('loginAt').defaultTo(knex.fn.now())
    t.timestamp('createdAt').defaultTo(knex.fn.now())
    t.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
}

exports.down = knex => {
  return knex.schema.dropTable('users')
}
