import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { validateEmail, validatePassword } from '../utils/loginCredentials.js';
import * as bcrypt from 'bcrypt';
import {
  JwtPair,
  JwtToken,
  RegisterDto,
  RegisterResponse,
  SignTokenPayload,
} from './auth_api.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async getAccessToken(payload: SignTokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '1h',
    });
  }

  private async getRefreshToken(payload: SignTokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });
  }

  async signIn(email: string, pass: string): Promise<JwtPair> {
    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException("User with this email doesn't exist");
    }
    const isPasswordMatching = await bcrypt.compare(pass, user?.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException("Password doesn't match");
    }
    const payload: SignTokenPayload = {
      email: user.email,
      user_id: user.user_id,
    };
    return {
      accessToken: await this.getAccessToken(payload),
      refreshToken: await this.getRefreshToken(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponse> {
    const userExists = await this.usersService.getByEmail(registerDto.email);
    if (userExists) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      !validateEmail(registerDto.email) ||
      !validatePassword(registerDto.password)
    ) {
      throw new BadRequestException('Incorrect email or password format');
    }
    const user = await this.usersService.create(registerDto);
    const payload: RegisterResponse = {
      email: user.email,
      user_id: user.user_id,
    };

    return payload;
  }

  async refresh(refreshToken: string): Promise<JwtPair> {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });
    const newPayload: SignTokenPayload = {
      email: payload.email,
      user_id: payload.user_id,
    };
    return {
      accessToken: await this.getAccessToken(newPayload),
      refreshToken: await this.getRefreshToken(newPayload),
    };
  }
}
