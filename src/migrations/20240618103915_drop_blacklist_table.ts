import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('blacklist');
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.createTable('blacklist', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.timestamps(true, true);
  });
}
