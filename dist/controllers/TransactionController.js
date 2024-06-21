"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const TransactionService_1 = require("../services/TransactionService");
class TransactionController {
    constructor() {
        this.transactionService = new TransactionService_1.TransactionService();
    }
    async fundAccount(req, res) {
        try {
            const { userId, amount } = req.body;
            const transaction = await this.transactionService.fundAccount(userId, amount);
            res.status(201).json(transaction);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
    async transferFunds(req, res) {
        try {
            const { senderId, recipientEmail, amount } = req.body;
            const transaction = await this.transactionService.transferFunds(senderId, recipientEmail, amount);
            res.status(201).json(transaction);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
    async withdrawFunds(req, res) {
        try {
            const { userId, amount } = req.body;
            const transaction = await this.transactionService.withdrawFunds(userId, amount);
            res.status(201).json(transaction);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
}
exports.TransactionController = TransactionController;
