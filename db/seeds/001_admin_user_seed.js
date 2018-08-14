'use strict'

const { User } = require('../../server/models')

// NOTE: These are just seeds to enable initial login. Two users are created:
// 1. an admin user with full override permissions
// 2. a regular user with restrictive permissions
// Be sure to login with these users and update their passwords after seeding
// the database!
exports.seed = (knex, Promise) => knex(User.tableName).del()
  .then(() => [
    {
      username: 'admin',
      password: 'password',
      email: 'admin@email.com'
    },
    {
      username: 'rob',
      password: 'password',
      email: 'rob@email.com'
    }
  ])
  .then(newUsers => Promise.all(newUsers.map(user => User.create(user))))
  .catch(err => console.log('err: ', err))
