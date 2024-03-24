import { Entity, ManyToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import { Day } from '../day_entity.js';

@Entity()
export class DayDetails {
  @PrimaryKey()
  id!: string;

  @Property()
  app_name!: string;

  @Property()
  user_id!: string;

  @Property()
  app_open_time: number = 0;

  @Property()
  created_at: Date = new Date();

  @ManyToOne(() => Day)
  day!: Rel<Day>;
}
