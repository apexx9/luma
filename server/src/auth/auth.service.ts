import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { CookieOptions, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { and, eq, ne } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema, sessions, users } from '../db/schema';
import type {
  AuthSessionResponse,
  AuthTokenPayload,
  AuthUser,
  SessionMeta,
} from './auth.types';
import type { ChangePasswordDto } from './dto/change-password.dto';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';
import type { UpdateProfileDto } from './dto/update-profile.dto';

type Database = NodePgDatabase<typeof schema>;
type UserRow = typeof users.$inferSelect;
type SessionRow = typeof sessions.$inferSelect;

const ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_EXPIRES_IN ?? '15m';
const REFRESH_TOKEN_TTL = process.env.JWT_REFRESH_EXPIRES_IN ?? '7d';
const REFRESH_TOKEN_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;
const REFRESH_COOKIE_NAME = 'luma_refresh_token';

@Injectable()
export class AuthService {
  constructor(@Inject('DRIZZLE') private readonly db: Database) {}

  get refreshCookieName(): string {
    return REFRESH_COOKIE_NAME;
  }

  getRefreshCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS),
    };
  }

  clearRefreshCookie(res: Response): void {
    res.clearCookie(REFRESH_COOKIE_NAME, {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  async register(
    data: RegisterDto,
    meta?: SessionMeta,
  ): Promise<AuthSessionResponse> {
    const existingUser = await this.db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const hash = await bcrypt.hash(data.password, 12);

    const [createdUser] = await this.db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        password: hash,
        mustChangePassword: false,
        profileVerified: true,
        passwordChangedAt: new Date(),
        profileVerifiedAt: new Date(),
      })
      .returning();

    if (!createdUser) {
      throw new BadRequestException('Failed to create user');
    }

    return this.createAuthenticatedSession(createdUser, meta);
  }

  async login(
    data: LoginDto,
    meta?: SessionMeta,
  ): Promise<AuthSessionResponse> {
    const user = await this.validateUser(data.email, data.password);
    return this.createAuthenticatedSession(user, meta);
  }

  async refresh(
    refreshToken: string,
    meta?: SessionMeta,
  ): Promise<AuthSessionResponse> {
    const payload = this.verifyRefreshToken(refreshToken);
    const session = await this.getActiveSessionById(payload.sid);

    if (!session || this.hashToken(refreshToken) !== session.refreshToken) {
      throw new UnauthorizedException('Refresh session is no longer valid');
    }

    const user = await this.getUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const nextTokens = this.issueTokens(user, session.sessionId);

    await this.db
      .update(sessions)
      .set({
        refreshToken: this.hashToken(nextTokens.refreshToken),
        userAgent: meta?.userAgent ?? session.userAgent,
        ipAddress: meta?.ipAddress ?? session.ipAddress,
        lastUsedAt: new Date(),
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS),
        revokedAt: null,
      })
      .where(eq(sessions.sessionId, session.sessionId));

    return nextTokens;
  }

  async logout(
    userId: number,
    sessionId?: string | null,
    refreshToken?: string | null,
  ): Promise<void> {
    if (sessionId) {
      await this.db
        .delete(sessions)
        .where(
          and(eq(sessions.userId, userId), eq(sessions.sessionId, sessionId)),
        );
      return;
    }

    if (refreshToken) {
      const payload = this.verifyRefreshToken(refreshToken);
      await this.db
        .delete(sessions)
        .where(
          and(eq(sessions.userId, userId), eq(sessions.sessionId, payload.sid)),
        );
      return;
    }

    throw new BadRequestException(
      'A session identifier or refresh token is required to logout',
    );
  }

  async logoutEverywhere(userId: number): Promise<void> {
    await this.db.delete(sessions).where(eq(sessions.userId, userId));
  }

  async getMe(userId: number): Promise<AuthUser> {
    const user = await this.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.toAuthUser(user);
  }

  async updateProfile(
    userId: number,
    data: UpdateProfileDto,
  ): Promise<AuthUser> {
    const user = await this.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (data.email && data.email !== user.email) {
      const existing = await this.db.query.users.findFirst({
        where: eq(users.email, data.email),
      });

      if (existing) {
        throw new ConflictException('A user with this email already exists');
      }
    }

    const [updatedUser] = await this.db
      .update(users)
      .set({
        name: data.name ?? user.name,
        email: data.email ?? user.email,
        profileVerified: true,
        profileVerifiedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser) {
      throw new BadRequestException('Failed to update profile');
    }

    return this.toAuthUser(updatedUser);
  }

  async changePassword(
    userId: number,
    data: ChangePasswordDto,
    currentSessionId?: string | null,
  ): Promise<void> {
    const user = await this.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordMatches = await bcrypt.compare(
      data.currentPassword,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const nextHash = await bcrypt.hash(data.newPassword, 12);

    await this.db
      .update(users)
      .set({
        password: nextHash,
        mustChangePassword: false,
        passwordChangedAt: new Date(),
      })
      .where(eq(users.id, userId));

    await this.revokeOtherSessions(userId, currentSessionId);
  }

  async validateUser(email: string, password: string): Promise<UserRow> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async getUserById(userId: number): Promise<UserRow | null> {
    return (
      (await this.db.query.users.findFirst({
        where: eq(users.id, userId),
      })) ?? null
    );
  }

  async getSessionById(sessionId: string): Promise<SessionRow | null> {
    return (
      (await this.db.query.sessions.findFirst({
        where: eq(sessions.sessionId, sessionId),
      })) ?? null
    );
  }

  private async createAuthenticatedSession(
    user: UserRow,
    meta?: SessionMeta,
  ): Promise<AuthSessionResponse> {
    const sessionId = crypto.randomUUID();
    const tokens = this.issueTokens(user, sessionId);

    await this.db.insert(sessions).values({
      sessionId,
      userId: user.id,
      refreshToken: this.hashToken(tokens.refreshToken),
      userAgent: meta?.userAgent ?? null,
      ipAddress: meta?.ipAddress ?? null,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS),
      lastUsedAt: new Date(),
    });

    return tokens;
  }

  private issueTokens(user: UserRow, sessionId: string): AuthSessionResponse {
    const payload = this.buildTokenPayload(user, sessionId);
    const accessTokenOptions = {
      expiresIn: ACCESS_TOKEN_TTL as jwt.SignOptions['expiresIn'],
    };
    const refreshTokenOptions = {
      expiresIn: REFRESH_TOKEN_TTL as jwt.SignOptions['expiresIn'],
    };

    return {
      accessToken: jwt.sign(
        payload,
        this.requireSecret('JWT_SECRET'),
        accessTokenOptions,
      ),
      refreshToken: jwt.sign(
        payload,
        this.requireSecret('REFRESH_SECRET'),
        refreshTokenOptions,
      ),
      user: this.toAuthUser(user),
    };
  }

  private buildTokenPayload(
    user: UserRow,
    sessionId: string,
  ): AuthTokenPayload {
    return {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role ?? 'User',
      sid: sessionId,
      jti: crypto.randomUUID(),
      mustChangePassword: Boolean(user.mustChangePassword),
      profileVerified: Boolean(user.profileVerified),
    };
  }

  private verifyRefreshToken(refreshToken: string): AuthTokenPayload {
    try {
      const decoded = jwt.verify(
        refreshToken,
        this.requireSecret('REFRESH_SECRET'),
      );

      if (typeof decoded !== 'object' || decoded === null) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const payload = decoded as jwt.JwtPayload & Record<string, unknown>;

      if (
        typeof payload.sub !== 'number' ||
        typeof payload.email !== 'string' ||
        typeof payload.name !== 'string' ||
        typeof payload.role !== 'string' ||
        typeof payload.sid !== 'string' ||
        typeof payload.jti !== 'string'
      ) {
        throw new UnauthorizedException('Invalid refresh token payload');
      }

      return {
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        sid: payload.sid,
        jti: payload.jti,
        mustChangePassword:
          typeof payload.mustChangePassword === 'boolean'
            ? payload.mustChangePassword
            : false,
        profileVerified:
          typeof payload.profileVerified === 'boolean'
            ? payload.profileVerified
            : false,
      };
    } catch {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }
  }

  private async getActiveSessionById(
    sessionId: string,
  ): Promise<SessionRow | null> {
    const session = await this.getSessionById(sessionId);

    if (!session || session.revokedAt) {
      return null;
    }

    if (session.expiresAt.getTime() <= Date.now()) {
      await this.db
        .update(sessions)
        .set({ revokedAt: new Date() })
        .where(eq(sessions.sessionId, session.sessionId));
      return null;
    }

    return session;
  }

  private async revokeOtherSessions(
    userId: number,
    currentSessionId?: string | null,
  ): Promise<void> {
    if (currentSessionId) {
      await this.db
        .delete(sessions)
        .where(
          and(
            eq(sessions.userId, userId),
            ne(sessions.sessionId, currentSessionId),
          ),
        );
      return;
    }

    await this.logoutEverywhere(userId);
  }

  private toAuthUser(user: UserRow): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role ?? 'User',
      mustChangePassword: Boolean(user.mustChangePassword),
      profileVerified: Boolean(user.profileVerified),
    };
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private requireSecret(name: 'JWT_SECRET' | 'REFRESH_SECRET'): string {
    const value = process.env[name];

    if (!value) {
      throw new Error(`${name} is not configured`);
    }

    return value;
  }
}
