import { Module } from '@nestjs/common';
import { AuthGuard } from '../auth/guard.js';
import { APP_GUARD } from '@nestjs/core';
import { DayService } from './day.service.js';
import { DayController } from './day.controller.js';

@Module({
  providers: [
    DayService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [DayService],
  controllers: [DayController],
})
export class DayModule {}
