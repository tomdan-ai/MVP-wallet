import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.decimal('balance', 14, 2).defaultTo(0);
    table.string('token').unique();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
