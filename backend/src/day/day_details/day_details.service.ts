import { EntityManager } from '@mikro-orm/postgresql';
import { HttpException, Injectable } from '@nestjs/common';
import { DayDetails } from './day_details_entity.js';
import { Day } from '../day_entity.js';

@Injectable()
export class DayDetailsService {
  constructor(private readonly em: EntityManager) {}

  async delete(detailsId: string): Promise<string> {
    try {
      await this.em.nativeDelete(DayDetails, { id: detailsId });
      return detailsId;
    } catch (e) {
      throw new HttpException('Day details not found', 404);
    }
  }

  async create(details: DayDetails): Promise<DayDetails> {
    await this.em.persistAndFlush(details);
    return details;
  }

  async update(detailsId: string, time: number): Promise<DayDetails> {
    const details = await this.em.findOne(DayDetails, { id: detailsId });
    if (!details) {
      throw new HttpException('Day details not found', 404);
    }
    details.app_open_time = time;
    await this.em.persistAndFlush(details);
    return details;
  }

  async getDetailsByDay(day: Day): Promise<DayDetails[]> {
    return await this.em.find(DayDetails, { day: day });
  }

  async checkIfDetailsExists(name: string): Promise<boolean> {
    return (await this.em.count(DayDetails, { app_name: name })) > 0;
  }
}
