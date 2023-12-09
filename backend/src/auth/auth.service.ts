import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { UserRegister } from '../types/User.js';
import { validateEmail, validatePassword } from '../utils/loginCredentials.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException("User with this email doesn't exist");
    }
    const isPasswordMatching = await bcrypt.compare(pass, user?.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException("Password doesn't match");
    }
    const payload = { email: user.email, sub: user.user_id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(userRegister: UserRegister) {
    const userExists = await this.usersService.findOne(userRegister.email);
    if (userExists) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      !validateEmail(userRegister.email) ||
      !validatePassword(userRegister.password)
    ) {
      throw new BadRequestException('Incorrect email or password format');
    }
    const user = await this.usersService.create(userRegister);
    const payload = { email: user.email, sub: user.user_id };
    return payload;
  }
}
