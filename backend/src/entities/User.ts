import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  user_Id!: number;

  @Property({ nullable: false })
  name!: string[];
}
