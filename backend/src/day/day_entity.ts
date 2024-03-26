import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { DayDetails } from './day_details/day_details_entity.js';

@Entity()
export class Day {
  @PrimaryKey()
  id!: string;

  @Property({ type: 'date' })
  date!: Date;

  @Property()
  user_id!: string;

  @Property()
  time: number = 0;

  @Property()
  created_at: Date = new Date();

  @OneToMany(() => DayDetails, (details) => details.day, { eager: true })
  details = new Collection<DayDetails>(this);
}
