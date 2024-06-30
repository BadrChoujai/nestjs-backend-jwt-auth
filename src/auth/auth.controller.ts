import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/register.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';
import JwtAuthGuard from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user')
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;

    return user;
  }

  @Post('register')
  async register(@Body() registrationData: RegistrationDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Body() loginData: LoginDto) {
    const token = this.authService.loginWithJwtToken(loginData);

    return { token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut() {
    return this.authService.logout();
  }
}
