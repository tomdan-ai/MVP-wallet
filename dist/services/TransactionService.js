"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const User_1 = require("../models/User");
class TransactionService {
    constructor() {
        this.userModel = new User_1.UserModel();
    }
    async fundAccount(userId, amount) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.balance += amount;
        await this.userModel.update(user);
    }
    async transferFunds(fromUserId, toUserId, amount) {
        const fromUser = await this.userModel.findById(fromUserId);
        const toUser = await this.userModel.findById(toUserId);
        if (!fromUser) {
            throw new Error('Sender not found');
        }
        if (!toUser) {
            throw new Error('Recipient not found');
        }
        if (fromUser.balance < amount) {
            throw new Error('Insufficient funds');
        }
        fromUser.balance -= amount;
        toUser.balance += amount;
        await this.userModel.update(fromUser);
        await this.userModel.update(toUser);
    }
    async withdrawFunds(userId, amount) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.balance < amount) {
            throw new Error('Insufficient funds');
        }
        user.balance -= amount;
        await this.userModel.update(user);
    }
}
exports.TransactionService = TransactionService;
exports.default = new TransactionService();
