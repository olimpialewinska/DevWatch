import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  user_id!: string;

  @Property({ nullable: false })
  email!: string;

  @Property({ nullable: false })
  password!: string;
}
