import bcrypt from 'bcrypt';
import axios from 'axios';
import { UserModel, User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

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
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userModel.create({ ...user, password: hashedPassword });
    return newUser;
  }

  private async checkKarmaList(identity: string): Promise<boolean> {

    try {
      const response = await axios.get(`https://adjutor.lendsqr.com/v2/verification/karma/${identity}`, {
        headers: {
          Authorization: `Bearer ${process.env.KARMA_API_TOKEN}`,
        },
      });

      if (response.data) {
        return true; 
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          return false; 
        }
        console.error('Axios error checking Karma List:', error.message);
      } else if (error instanceof Error) {
        console.error('Error checking Karma List:', error.message);
      } else {
        console.error('Unexpected error checking Karma List:', error);
      }
      throw new Error('Error checking Karma List');
    }

    return false;
  }
  public async loginUser(email: string, password: string): Promise<string> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = uuidv4();
    await this.userModel.update({ ...user, token });
    return token;
  }

  public async findByToken(token: string): Promise<User | null> {
    const user = await this.userModel.findByToken(token);
    return user;
  }
}
