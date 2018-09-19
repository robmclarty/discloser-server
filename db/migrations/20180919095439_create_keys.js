'use strict'

exports.up = knex => {
  return knex.schema.createTable('keys', t => {
    t.increments('id').primary().unsigned()
    t.integer('userId').references('users.id').unsigned().index().onDelete('CASCADE')
    t.string('name')
    t.text('data')
    t.string('fingerprint').unique().index()
    t.timestamp('createdAt').defaultTo(knex.fn.now())
    t.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
}

exports.down = knex => {
  return knex.schema.dropTable('keys')
}
