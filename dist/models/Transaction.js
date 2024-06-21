"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const knex_1 = __importDefault(require("../knex"));
class TransactionModel {
    constructor() {
        this.db = knex_1.default;
    }
    async create(transaction) {
        const [newTransaction] = await this.db('transactions').insert(transaction).returning('*');
        return newTransaction;
    }
}
exports.TransactionModel = TransactionModel;
