import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PASSWORD_HASH } from '../constants/passwordHash.js';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user_entity.js';
import { RegisterDto } from 'src/auth/auth_api.js';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async create(userRegister: RegisterDto): Promise<User> {
    const user = new User();
    user.user_id = uuidv4();
    user.email = userRegister.email;
    user.password = await bcrypt.hash(userRegister.password, PASSWORD_HASH);
    await this.em.persistAndFlush(user);
    return user;
  }

  public async findOne(query: any): Promise<User | null> {
    const user = await this.em.findOne(User, query);
    return user;
  }

  async getById(userId: string): Promise<User | null> {
    return this.findOne({ user_id: userId });
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }
}
