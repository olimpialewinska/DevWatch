import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { AuthGuard } from '../auth/guard.js';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
