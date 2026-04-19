import { Inject, Injectable } from '@nestjs/common';
import { users } from 'src/db/schema';

@Injectable()
export class UsersService {
  constructor(@Inject('DRIZZLE') private db: any) {}

  async createUser(data: { name: string; email: string }) {
    return this.db.insert(users).values(data).returning();
  }

  async getUsers() {
    return this.db.select().from(users);
  }
}
