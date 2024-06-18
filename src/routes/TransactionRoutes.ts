import { Router } from 'express';
import TransactionService from '../services/TransactionService';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.post('/fund', authenticate, async (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number') {
    return res.status(400).json({ message: 'Amount must be a number' });
  }
  try {
    await TransactionService.fundAccount((req as any).user.id, amount);
    res.status(200).send('Account funded successfully');
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
});

router.post('/transfer', authenticate, async (req, res) => {
  const { toUserId, amount } = req.body;
  if (typeof toUserId !== 'string' || typeof amount !== 'number') {
    return res.status(400).json({ message: 'Invalid input types' });
  }
  try {
    await TransactionService.transferFunds((req as any).user.id, toUserId, amount);
    res.status(200).send('Funds transferred successfully');
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
});

router.post('/withdraw', authenticate, async (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number') {
    return res.status(400).json({ message: 'Amount must be a number' });
  }
  try {
    await TransactionService.withdrawFunds((req as any).user.id, amount);
    res.status(200).send('Funds withdrawn successfully');
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
});

export default router;
