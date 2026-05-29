import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import type { AuthenticatedRequest, AuthTokenPayload } from '../auth.types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractBearerToken(req);

    if (!token) {
      throw new UnauthorizedException('Access token is required');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      req.user = this.normalizeAuthTokenPayload(decoded);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  private extractBearerToken(req: AuthenticatedRequest): string | null {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return null;
    }

    const [scheme, token] = authorization.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      return null;
    }

    return token;
  }

  private normalizeAuthTokenPayload(payload: unknown): AuthTokenPayload {
    if (typeof payload !== 'object' || payload === null) {
      throw new UnauthorizedException('Invalid access token payload');
    }

    const value = payload as Record<string, unknown>;

    if (
      typeof value.sub !== 'number' ||
      typeof value.email !== 'string' ||
      typeof value.name !== 'string' ||
      typeof value.role !== 'string' ||
      typeof value.sid !== 'string' ||
      typeof value.jti !== 'string'
    ) {
      throw new UnauthorizedException('Invalid access token payload');
    }

    return {
      sub: value.sub,
      email: value.email,
      name: value.name,
      role: value.role,
      sid: value.sid,
      jti: value.jti,
      mustChangePassword:
        typeof value.mustChangePassword === 'boolean'
          ? value.mustChangePassword
          : false,
      profileVerified:
        typeof value.profileVerified === 'boolean'
          ? value.profileVerified
          : false,
    };
  }
}
