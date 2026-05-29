import type { Request } from 'express';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar?: string | null;
  mustChangePassword: boolean;
  profileVerified: boolean;
}

export interface AuthTokenPayload {
  sub: number;
  email: string;
  name: string;
  role: string;
  sid: string;
  jti: string;
  mustChangePassword: boolean;
  profileVerified: boolean;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export interface AuthSessionResponse extends AuthResponse {
  refreshToken: string;
}

export interface SessionMeta {
  userAgent?: string;
  ipAddress?: string;
}

export type AuthenticatedRequest = Request & {
  user?: AuthTokenPayload;
  cookies?: Record<string, string | undefined>;
};
