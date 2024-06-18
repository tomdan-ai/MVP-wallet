import { UserModel } from '../models/User';

class TransactionService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  public async fundAccount(userId: string, amount: number): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.balance += amount;
    await this.userModel.update(user);
  }

  public async transferFunds(fromUserId: string, toUserId: string, amount: number): Promise<void> {
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

  public async withdrawFunds(userId: string, amount: number): Promise<void> {
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

export default new TransactionService();
