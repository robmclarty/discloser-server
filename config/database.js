'use strict'

// ref: https://devhints.io/knex
const knexfile = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE || 'postgres://localhost:5432/discloser-server',
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

const env = process.env.NODE_ENV || 'development'
const knex = require('knex')(knexfile[env])

module.exports = knex
