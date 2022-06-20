import {Knex} from 'knex'

export const connection: Knex.PgConnectionConfig = {
  host: 'db',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
}

const config: Knex.Config = {
  client: 'pg',
  connection,
  migrations: {tableName: 'migrations'},
}

export default config

export const knexConfig = config
