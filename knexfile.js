'use strict'

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE || 'postgres://localhost:5432/discloser',
  migrations: {
    tableName: 'knex_migrations',
    directory: `${ __dirname }/db/migrations`
  },
  seeds: {
    directory: `${ __dirname }/db/seeds`
  }
}
