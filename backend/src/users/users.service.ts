import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/User.js';
import { UserRegister } from '../types/User.js';
import * as bcrypt from 'bcrypt';
import { PASSWORD_HASH } from '../constants/passwordHash.js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async findOne(email: string): Promise<User> {
    return await this.em.findOne('User', { email });
  }

  async create(userRegister: UserRegister): Promise<User> {
    const user = new User();
    user.user_id = uuidv4();
    user.last_name = userRegister.last_name;
    user.first_name = userRegister.first_name;
    user.email = userRegister.email;
    user.password = await bcrypt.hash(userRegister.password, PASSWORD_HASH);
    await this.em.persistAndFlush(user);
    return user;
  }

  async getOne(user_id: string): Promise<User> {
    const user = await this.em.findOne(User, { user_id: user_id });
    return user;
  }
}
