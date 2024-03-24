import { EntityManager } from '@mikro-orm/postgresql';
import { HttpException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Day } from './day_entity.js';
import { Pagination } from '../types/pagination.js';
import { DayDetailsService } from './day_details/day_details.service.js';
import { DayDetailsUpdate } from './types.js';
import { DayDetails } from './day_details/day_details_entity.js';

@Injectable()
export class DayService {
  constructor(
    private readonly em: EntityManager,
    private readonly detailsService: DayDetailsService,
  ) {}

  async create(userId: string): Promise<Day> {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const exist = await this.getByDate(date.toISOString());
    if (exist) {
      return exist;
    }
    const day = new Day();
    day.id = uuidv4();
    day.date = date.toISOString();
    day.user_id = userId;
    await this.em.persistAndFlush(day);
    return day;
  }

  async checkIfDayExists(date: string): Promise<boolean> {
    return (await this.em.count(Day, { date })) > 0;
  }

  async getByDate(date: string): Promise<Day | null> {
    return await this.em.findOne(Day, {
      date,
    });
  }

  async getById(id: string): Promise<Day | null> {
    return await this.em.findOne(Day, { id }, { populate: ['details'] });
  }

  async delete(id: string): Promise<string> {
    try {
      await this.em.nativeDelete(Day, { id });
      return id;
    } catch (e) {
      throw new HttpException('Day not found', 404);
    }
  }

  async update(
    id: string,
    time: number,
    details: DayDetailsUpdate,
  ): Promise<Day> {
    const day = await this.getById(id);
    if (!day) {
      throw new HttpException('Day not found', 404);
    }
    day.time = time;

    if (details) {
      for (const key in details) {
        const detail = await this.detailsService.getDetailsByDay(day);
        const exists = detail.find((d) => d.app_name === key);
        if (exists) {
          exists.app_open_time = details[key];
          await this.detailsService.update(exists.id, exists.app_open_time);
        } else {
          const newDetail = new DayDetails();
          newDetail.id = uuidv4();
          newDetail.app_name = key;
          newDetail.app_open_time = details[key];
          newDetail.day = day;
          newDetail.user_id = day.user_id;
          await this.detailsService.create(newDetail);
          day.details.add(newDetail);
        }
      }
    }

    await this.em.persistAndFlush(day);

    const updatedDay = await this.getById(id);
    if (!updatedDay) {
      throw new HttpException('Updated day not found', 404);
    }

    return updatedDay;
  }

  async getHistory(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<Pagination<Day>> {
    const results = await this.em.find(
      Day,
      { user_id: userId },
      {
        orderBy: { created_at: 'DESC' },
        limit: limit,
        offset: offset,
      },
    );

    const count = await this.em.count(Day, { user_id: userId });

    const next =
      offset + limit < count
        ? `/day/history?limit=${limit}&offset=${offset + limit}`
        : null;
    const previous =
      offset > 0
        ? `/day/history?limit=${limit}&offset=${offset - limit}`
        : null;

    return {
      results,
      count,
      next,
      previous,
    };
  }
}

