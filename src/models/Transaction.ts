import knex from '../knex';
import { Knex } from 'knex';

export interface Transaction {
  id: number;
  user_id: number;
  type: 'fund' | 'transfer' | 'withdraw';
  amount: number;
  recipient_id?: number;
}

export class TransactionModel {
  private db: Knex;

  constructor() {
    this.db = knex;
  }

  public async create(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const [newTransaction] = await this.db('transactions').insert(transaction).returning('*');
    return newTransaction;
  }

}
