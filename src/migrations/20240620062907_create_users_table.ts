import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.string('id').primary();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('token').nullable();
        table.float('balance').defaultTo(0);
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
