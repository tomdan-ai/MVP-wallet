import knex from '../knex';
import { Knex } from 'knex';

export interface User {
  id: number;
  email: string;
  password: string;
  balance: number;
}

export class UserModel {
    private db: Knex;
  
    constructor() {
      this.db = knex;
    }
  
    public async create(user: Omit<User, 'id'>): Promise<User> {
      const [newUser] = await this.db('users').insert(user).returning('*');
      return newUser;
    }
  
    public async findByEmail(email: string): Promise<User | null> {
      const user = await this.db('users').where({ email }).first();
      return user || null;
    }
  
    public async findById(id: number): Promise<User | null> {
      const user = await this.db('users').where({ id }).first();
      return user || null;
    }
  
    public async update(user: User): Promise<void> {
      await this.db('users').where({ id: user.id }).update(user);
    }

  // Other methods for finding, updating, and deleting users
}
