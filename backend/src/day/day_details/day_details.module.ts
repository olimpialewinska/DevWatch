import { Module } from '@nestjs/common';
import { AuthGuard } from '../../auth/guard.js';
import { APP_GUARD } from '@nestjs/core';
import { DayDetailsService } from './day_details.service.js';

@Module({
  providers: [
    DayDetailsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [DayDetailsService],
})
export class DayDetailsModule {}
