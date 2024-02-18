import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  user_id!: string;

  @Property({ nullable: false })
  first_name!: string;

  @Property({ nullable: false })
  last_name!: string;

  @Property({ nullable: false })
  email!: string;

  @Property({ nullable: false })
  password!: string;

  @Property({ nullable: true })
  avatar!: string;
}
