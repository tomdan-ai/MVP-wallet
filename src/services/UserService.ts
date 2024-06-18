import { UserModel } from '../models/User';
import { User } from '../models/User';

export class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  public async createUser(user: Omit<User, 'id'>): Promise<User | null> {
    if (user) {
      throw new Error('User is blacklisted');
    }
    return this.userModel.create(user);
  }
}
