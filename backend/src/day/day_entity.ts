import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Day {
  @PrimaryKey()
  id!: string;

  @Property()
  date!: string;

  @Property()
  user_id!: string;

  @Property()
  time: number = 0;

  @Property()
  created_at: Date = new Date();
}
