import { CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class JwtAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return false;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      return true;
    } catch {
      return false;
    }
  }
}
