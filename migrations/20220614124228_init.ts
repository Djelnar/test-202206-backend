import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')

  await knex.raw(/* sql */ `
    CREATE OR REPLACE FUNCTION updated_timestamp_func()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `)
}

export async function down(knex: Knex): Promise<void> {}
