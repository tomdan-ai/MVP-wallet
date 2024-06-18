import { UserModel } from '../models/User';
import { BlacklistModel } from '../models/Blacklist';
import { User } from '../models/User';

export class UserService {
  private userModel: UserModel;
  private blacklistModel: BlacklistModel;

  constructor() {
    this.userModel = new UserModel();
    this.blacklistModel = new BlacklistModel();
  }

  public async createUser(user: Omit<User, 'id'>): Promise<User | null> {
    const isBlacklisted = await this.blacklistModel.findByEmail(user.email);
    if (isBlacklisted) {
      throw new Error('User is blacklisted');
    }
    return this.userModel.create(user);
  }
}
