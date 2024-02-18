import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../auth/guard.js';
import { GetProfileRequest, GetProfileResponse } from './users_api.js';
import { UserNotFoundException } from './user_errors.js';
import { User } from './user_entity.js';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private async getById(userId: string): Promise<User> {
    const user = await this.usersService.getById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  private toApiUser(user: User): GetProfileResponse {
    return {
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  }

  @Get('profile')
  async getProfile(
    @Request() req: GetProfileRequest,
  ): Promise<GetProfileResponse> {
    return this.toApiUser(await this.getById(req.user_id.toString()));
  }
}
