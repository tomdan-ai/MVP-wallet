"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TransactionService_1 = __importDefault(require("../services/TransactionService"));
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.Router)();
router.post('/fund', authenticate_1.authenticate, async (req, res) => {
    const { amount } = req.body;
    if (typeof amount !== 'number') {
        return res.status(400).json({ message: 'Amount must be a number' });
    }
    try {
        await TransactionService_1.default.fundAccount(req.user.id, amount);
        res.status(200).send('Account funded successfully');
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
});
router.post('/transfer', authenticate_1.authenticate, async (req, res) => {
    const { toUserId, amount } = req.body;
    if (typeof toUserId !== 'string' || typeof amount !== 'number') {
        return res.status(400).json({ message: 'Invalid input types' });
    }
    try {
        await TransactionService_1.default.transferFunds(req.user.id, toUserId, amount);
        res.status(200).send('Funds transferred successfully');
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
});
router.post('/withdraw', authenticate_1.authenticate, async (req, res) => {
    const { amount } = req.body;
    if (typeof amount !== 'number') {
        return res.status(400).json({ message: 'Amount must be a number' });
    }
    try {
        await TransactionService_1.default.withdrawFunds(req.user.id, amount);
        res.status(200).send('Funds withdrawn successfully');
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
});
exports.default = router;
