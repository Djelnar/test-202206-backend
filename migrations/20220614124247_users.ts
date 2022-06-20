import {Knex} from 'knex'
import {tables} from '../tables'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tables.users, (table) => {
    table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('email', 254).notNullable().unique()
    table.string('password', 60).notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tables.users)
}
