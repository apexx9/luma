import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import type { AuthenticatedRequest } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = await this.auth.register(body, {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    });
    res.cookie(
      this.auth.refreshCookieName,
      session.refreshToken,
      this.auth.getRefreshCookieOptions(),
    );
    return { accessToken: session.accessToken, user: session.user };
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = await this.auth.login(body, {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    });
    res.cookie(
      this.auth.refreshCookieName,
      session.refreshToken,
      this.auth.getRefreshCookieOptions(),
    );
    return { accessToken: session.accessToken, user: session.user };
  }

  @Post('refresh')
  async refresh(
    @Body('refreshToken') bodyRefreshToken: string | undefined,
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken =
      req.cookies?.[this.auth.refreshCookieName] ?? bodyRefreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const session = await this.auth.refresh(refreshToken, {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    });
    res.cookie(
      this.auth.refreshCookieName,
      session.refreshToken,
      this.auth.getRefreshCookieOptions(),
    );
    return { accessToken: session.accessToken, user: session.user };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Body('refreshToken') bodyRefreshToken: string | undefined,
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken =
      req.cookies?.[this.auth.refreshCookieName] ?? bodyRefreshToken;
    await this.auth.logout(req.user!.sub, req.user?.sid, refreshToken);
    this.auth.clearRefreshCookie(res);
    return { success: true };
  }

  @Post('logout-everywhere')
  @UseGuards(JwtAuthGuard)
  async logoutEverywhere(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.auth.logoutEverywhere(req.user!.sub);
    this.auth.clearRefreshCookie(res);
    return { success: true };
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  validate(@Req() req: AuthenticatedRequest) {
    return {
      valid: true,
      user: req.user
        ? {
            id: req.user.sub,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role,
            mustChangePassword: req.user.mustChangePassword,
            profileVerified: req.user.profileVerified,
          }
        : null,
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: AuthenticatedRequest) {
    return { user: await this.auth.getMe(req.user!.sub) };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() body: UpdateProfileDto,
  ) {
    return { user: await this.auth.updateProfile(req.user!.sub, body) };
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Req() req: AuthenticatedRequest,
    @Body() body: ChangePasswordDto,
  ) {
    await this.auth.changePassword(req.user!.sub, body, req.user?.sid);
    return { success: true };
  }
}
