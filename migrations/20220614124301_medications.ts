import {Knex} from 'knex'
import {tables} from '../tables'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tables.medications, (table) => {
    table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary()

    table.string('name').notNullable().defaultTo('')
    table.string('description').notNullable().defaultTo('')

    table.integer('count').notNullable().defaultTo(0)
    table.integer('destinationCount').notNullable().defaultTo(0)

    table.uuid('userId').references('id').inTable(tables.users).notNullable().onDelete('CASCADE')

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tables.medications)
}
