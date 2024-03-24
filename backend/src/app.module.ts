import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmConfigService } from './mikro-orm.config.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { DayModule } from './day/day.module.js';
import { DayDetailsModule } from './day/day_details/day_details.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [MikroOrmConfigService, ConfigService],
      useClass: MikroOrmConfigService,
    }),
    AuthModule,
    UsersModule,
    DayModule,
    DayDetailsModule,
  ],
})
export class AppModule {}
