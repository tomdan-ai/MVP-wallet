import { TransactionModel } from '../models/Transaction';
import { UserModel } from '../models/User';
import { Transaction } from '../models/Transaction';

export class TransactionService {
  private transactionModel: TransactionModel;
  private userModel: UserModel;

  constructor() {
    this.transactionModel = new TransactionModel();
    this.userModel = new UserModel();
  }

  public async fundAccount(userId: number, amount: number): Promise<Transaction> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.balance += amount;
    await this.userModel.update(user);
    return this.transactionModel.create({ user_id: userId, type: 'fund', amount });
  }

  public async transferFunds(senderId: number, recipientEmail: string, amount: number): Promise<Transaction> {
    const sender = await this.userModel.findById(senderId);
    const recipient = await this.userModel.findByEmail(recipientEmail);
    if (!sender || !recipient) {
      throw new Error('User not found');
    }
    if (sender.balance < amount) {
      throw new Error('Insufficient funds');
    }
    sender.balance -= amount;
    recipient.balance += amount;
    await this.userModel.update(sender);
    await this.userModel.update(recipient);
    return this.transactionModel.create({ user_id: senderId, type: 'transfer', amount, recipient_id: recipient.id });
  }

  public async withdrawFunds(userId: number, amount: number): Promise<Transaction> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.balance < amount) {
      throw new Error('Insufficient funds');
    }
    user.balance -= amount;
    await this.userModel.update(user);
    return this.transactionModel.create({ user_id: userId, type: 'withdraw', amount });
  }

}
