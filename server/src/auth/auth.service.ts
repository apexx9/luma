import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { users, sessions } from '../db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

@Injectable()
export class AuthService {
  constructor(@Inject('DRIZZLE') private db: any) {}

  async register(data: any) {
    const hash = await bcrypt.hash(data.password, 10);

    return this.db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        password: hash,
      })
      .returning();
  }

  async login(user: any, req: any) {
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
      expiresIn: '7d',
    });

    await this.db.insert(sessions).values({
      userId: user.id,
      refreshToken,
      userAgent: req.headers['user-agent'],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  }

  async refresh(token: string) {
    const session = await this.db.query.sessions.findFirst({
      where: (sessions, { eq }) => eq(sessions.refreshToken, token),
    });

    if (!session) throw new Error('Invalid session');

    const payload: any = jwt.verify(token, REFRESH_SECRET);

    const newAccessToken = jwt.sign({ userId: payload.userId }, JWT_SECRET, {
      expiresIn: '15m',
    });

    return { accessToken: newAccessToken };
  }

  async logout(userId: number) {
    return this.db
      .delete(sessions)
      .where(eq(sessions.userId, userId));
  }

  async logoutEverywhere(userId: number) {
    return this.db
      .delete(sessions)
      .where(eq(sessions.userId, userId));
  }

  async validateUser(email: string, password: string) {
    const user = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    return user;
  }
}
