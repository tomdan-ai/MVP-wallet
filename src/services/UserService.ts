import axios from 'axios';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserModel, User } from '../models/User';

export class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  public async createUser(user: Omit<User, 'id' | 'token'>): Promise<User | null> {
    const isBlacklisted = await this.checkKarmaList(user.email);
    if (isBlacklisted) {
      throw new Error('User is blacklisted');
    }
    user.password = await bcrypt.hash(user.password, 10);
    return this.userModel.create(user);
  }

  public async login(email: string, password: string): Promise<string | null> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = uuidv4();
    user.token = token;
    await this.userModel.update(user);
    return token;
  }

  public async findByToken(token: string): Promise<User | null> {
    return await this.userModel.findByToken(token);
  }

  private async checkKarmaList(identity: string): Promise<boolean> {
    try {
      const response = await axios.get(`https://adjutor.lendsqr.com/v2/verification/karma/${identity}`, {
        headers: {
          Authorization: `Bearer ${process.env.KARMA_API_TOKEN}`,
        },
      });

      if (response.data) {
        return true; // The user is blacklisted
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios specific error handling
        if (error.response && error.response.status === 404) {
          return false; // The user is not blacklisted
        }
        console.error('Axios error checking Karma List:', error.message);
      } else if (error instanceof Error) {
        // Generic error handling
        console.error('Error checking Karma List:', error.message);
      } else {
        console.error('Unexpected error checking Karma List:', error);
      }
      throw new Error('Error checking Karma List');
    }

    return false;
  }
}
