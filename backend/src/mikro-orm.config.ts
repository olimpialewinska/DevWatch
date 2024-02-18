import { Injectable } from '@nestjs/common';
import { Options } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import { User } from './users/user_entity.js';

@Injectable()
export class MikroOrmConfigService {
  constructor(private readonly config: ConfigService) {}

  createMikroOrmOptions(): Options {
    return {
      type: 'postgresql',
      allowGlobalContext: true,
      entities: [User],
      dbName: this.config.get('DB_NAME'),
      user: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
      entitiesTs: ['./src/entities'],
    };
  }
}
