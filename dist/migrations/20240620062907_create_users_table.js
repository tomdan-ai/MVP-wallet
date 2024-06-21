"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('users', (table) => {
        table.string('id').primary();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('token').nullable();
        table.float('balance').defaultTo(0);
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('users');
}
exports.down = down;
