'use strict'

// ref: https://devhints.io/knex
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE || 'postgres://localhost:5432/discloser',
    migrations: {
      tableName: 'knex_migrations',
      directory: `${ __dirname }/db/migrations`
    },
    seeds: {
      directory: `${ __dirname }/db/seeds`
    }
  },
  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${ __dirname }/db/migrations`
    },
    seeds: {
      directory: `${ __dirname }/db/seeds`
    }
  }
}
