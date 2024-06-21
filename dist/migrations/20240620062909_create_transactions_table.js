"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.string('sender_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('recipient_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.float('amount').notNullable();
        table.enu('type', ['fund', 'withdraw', 'transfer']).notNullable();
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('transactions');
}
exports.down = down;
