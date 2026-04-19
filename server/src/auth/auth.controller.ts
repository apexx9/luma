import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.auth.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Req() req: any) {
    const user = await this.auth.validateUser(body.email, body.password);
    return this.auth.login(user, req);
  }

  @Post('refresh')
  refresh(@Body('token') token: string) {
    return this.auth.refresh(token);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: any) {
    return this.auth.logout(req.user.userId);
  }

  @Post('logout-everywhere')
  @UseGuards(JwtAuthGuard)
  logoutAll(@Req() req: any) {
    return this.auth.logoutEverywhere(req.user.userId);
  }
}
