import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.string('sender_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('recipient_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.float('amount').notNullable();
        table.enu('type', ['fund', 'withdraw', 'transfer']).notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transactions');
}
