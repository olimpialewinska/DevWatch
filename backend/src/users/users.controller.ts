import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../auth/guard.js';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Request() req) {
    const user = this.usersService.getOne(req.user.sub.toString());
    return user;
  }
}
