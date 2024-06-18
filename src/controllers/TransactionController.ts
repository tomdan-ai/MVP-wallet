import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  public async fundAccount(req: Request, res: Response): Promise<void> {
    try {
      const { userId, amount } = req.body;
      const transaction = await this.transactionService.fundAccount(userId, amount);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }

  public async transferFunds(req: Request, res: Response): Promise<void> {
    try {
      const { senderId, recipientEmail, amount } = req.body;
      const transaction = await this.transactionService.transferFunds(senderId, recipientEmail, amount);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }

  public async withdrawFunds(req: Request, res: Response): Promise<void> {
    try {
      const { userId, amount } = req.body;
      const transaction = await this.transactionService.withdrawFunds(userId, amount);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }

}
