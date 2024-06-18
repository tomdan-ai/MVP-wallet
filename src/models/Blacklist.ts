import knex from '../knex';
import { Knex } from 'knex';

export interface Blacklist {
  id: number;
  email: string;
}

export class BlacklistModel {
  private db: Knex;

  constructor() {
    this.db = knex;
  }

  public async findByEmail(email: string): Promise<Blacklist | null> {
    const entry = await this.db('blacklist').where({ email }).first();
    return entry || null;
  }

}
