"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const knex_1 = __importDefault(require("../knex"));
const uuid_1 = require("uuid");
class UserModel {
    constructor() {
        this.db = knex_1.default;
    }
    async create(user) {
        const newUser = Object.assign(Object.assign({}, user), { id: (0, uuid_1.v4)(), token: (0, uuid_1.v4)() });
        const [createdUser] = await this.db('users').insert(newUser).returning('*');
        return createdUser;
    }
    async findByEmail(email) {
        const user = await this.db('users').where({ email }).first();
        return user || null;
    }
    async findById(id) {
        const user = await this.db('users').where({ id }).first();
        return user || null;
    }
    async findByToken(token) {
        const user = await this.db('users').where({ token }).first();
        return user || null;
    }
    async update(user) {
        await this.db('users').where({ id: user.id }).update(user);
    }
}
exports.UserModel = UserModel;
