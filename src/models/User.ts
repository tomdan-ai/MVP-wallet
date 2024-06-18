import knex from '../knex';
import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  password: string;
  balance: number;
  token?: string;
}

export class UserModel {
  private db: Knex;

  constructor() {
    this.db = knex;
  }

  public async create(user: Omit<User, 'id' | 'token'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: uuidv4(),
      token: uuidv4(),
    };
    const [createdUser] = await this.db('users').insert(newUser).returning('*');
    return createdUser;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.db('users').where({ email }).first();
    return user || null;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.db('users').where({ id }).first();
    return user || null;
  }

  public async findByToken(token: string): Promise<User | null> {
    const user = await this.db('users').where({ token }).first();
    return user || null;
  }

  public async update(user: User): Promise<void> {
    await this.db('users').where({ id: user.id }).update(user);
  }
}
