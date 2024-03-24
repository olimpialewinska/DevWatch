import { Injectable } from '@nestjs/common';
import { Options } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import { User } from './users/user_entity.js';
import { Day } from './day/day_entity.js';
import { DayDetails } from './day/day_details/day_details_entity.js';

@Injectable()
export class MikroOrmConfigService {
  constructor(private readonly config: ConfigService) {}

  createMikroOrmOptions(): Options {
    return {
      type: 'postgresql',
      allowGlobalContext: true,
      entities: [User, Day, DayDetails],
      dbName: this.config.get('DB_NAME'),
      user: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
    };
  }
}
