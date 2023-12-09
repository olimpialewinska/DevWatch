import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { UserLogin, UserRegister } from '../types/User.js';
import { AuthGuard } from './guard.js';
import { Public } from '../utils/publicDecorator.js';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: UserLogin) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerDto: UserRegister) {
    return this.authService.register(registerDto);
  }
}
