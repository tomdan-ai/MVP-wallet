import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';

const router = Router();
const transactionController = new TransactionController();

router.post('/transactions/fund', transactionController.fundAccount.bind(transactionController));
router.post('/transactions/transfer', transactionController.transferFunds.bind(transactionController));
router.post('/transactions/withdraw', transactionController.withdrawFunds.bind(transactionController));

export default router;
