import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transactions',(table) => {
        table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users');
        table.enu('type', ['fund', 'transfer', 'withdraw']).notNullable();
        table.decimal('amount', 14, 2).notNullable();
    table.integer('recipient_id').unsigned().references('id').inTable('users').nullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transactions');
}

