import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RolesGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    return user?.role?.includes('admin');
  }
}
