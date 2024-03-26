import { EntityManager } from '@mikro-orm/postgresql';
import { HttpException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Day } from './day_entity.js';
import { Pagination } from '../types/pagination.js';
import { DayDetailsService } from './day_details/day_details.service.js';
import { ChartResponse, DayDetailsUpdate, TodayPieChart } from './types.js';
import { DayDetails } from './day_details/day_details_entity.js';
import { DAYS } from '../constants/days.js';
import { MONTHS } from '../constants/months.js';

@Injectable()
export class DayService {
  constructor(
    private readonly em: EntityManager,
    private readonly detailsService: DayDetailsService,
  ) {}

  async create(userId: string): Promise<Day> {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const exist = await this.getByDate(date);
    if (exist) {
      return exist;
    }
    const day = new Day();
    day.id = uuidv4();
    day.date = date;
    day.user_id = userId;
    await this.em.persistAndFlush(day);
    return day;
  }

  async checkIfDayExists(date: string): Promise<boolean> {
    return (await this.em.count(Day, { date })) > 0;
  }

  async getByDate(date: Date): Promise<Day | null> {
    return await this.em.findOne(Day, {
      date,
    });
  }

  async getPeriodDays(userId: string, start: Date, end: Date): Promise<Day[]> {
    return await this.em.find(
      Day,
      {
        user_id: userId,
        date: { $gte: start, $lte: end },
      },
      {
        orderBy: { date: 'DESC' },
      },
    );
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

  getStartAndEndOfWeek({ type }: { type: 'week' | 'month' }) {
    const start = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    if (type === 'week') {
      start.setDate(start.getDate() - 7);
    } else if (type === 'month') {
      start.setMonth(start.getMonth() - 12);
    }

    start.setHours(0, 0, 0, 0);

    return { start, end };
  }
  async getBarChartLastWeek(userId: string): Promise<ChartResponse> {
    const { start, end } = this.getStartAndEndOfWeek({ type: 'week' });
    const results = await this.getPeriodDays(userId, start, end);
    const labels: string[] = [];
    const times: number[] = [];

    for (let i = 0; i < DAYS.length; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels[i] = DAYS[date.getDay()];
      times[i] = 0;
    }

    for (const result of results) {
      const date = new Date(result.date);
      const dayOfWeek = date.getDay();
      times[dayOfWeek] = result.time;
    }

    return {
      labels: labels.reverse(),
      times: times.reverse(),
    };
  }

  async getAppsPieChartToday(userId: string): Promise<TodayPieChart> {
    const day = await this.em.findOne(
      Day,
      {
        user_id: userId,
      },
      {
        orderBy: { date: 'DESC' },
      },
    );

    if (!day) {
      return {
        date: null,
        labels: [],
        times: [],
      };
    }
    const details = await this.detailsService.getDetailsByDay(day);

    return {
      date: day.date,
      labels: details.map((d) => d.app_name),
      times: details.map((d) => d.app_open_time),
    };
  }

  async getAverageWorkingTimeInMonths(userId: string): Promise<ChartResponse> {
    const { start, end } = this.getStartAndEndOfWeek({ type: 'month' });
    const results = await this.getPeriodDays(userId, start, end);

    const times: any = {};

    for (let i = 0; i < MONTHS.length; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = MONTHS[date.getMonth()];
      times[month] = { total: 0, count: 0 };
    }

    for (const result of results) {
      const date = new Date(result.date);
      const month = MONTHS[date.getMonth()];
      times[month].total += result.time;
      times[month].count++;
    }

    const labels: string[] = [];
    const averages: number[] = [];

    Object.keys(times).forEach((month, index) => {
      labels[index] = month;
      averages[index] = times[month].count
        ? times[month].total / times[month].count
        : 0;
    });

    return {
      labels: labels.reverse(),
      times: averages.reverse(),
    };
  }

  async numberOfAppsOpened7Days(userId: string): Promise<ChartResponse> {
    const { start, end } = this.getStartAndEndOfWeek({ type: 'week' });
    const results = await this.getPeriodDays(userId, start, end);

    const labels: string[] = [];
    const times: number[] = [];

    for (let i = 0; i < DAYS.length; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels[i] = DAYS[date.getDay()];
      times[i] = 0;
    }

    for (const result of results) {
      const date = new Date(result.date);
      const dayOfWeek = date.getDay();
      times[dayOfWeek] = result.details.count();
    }

    return {
      labels: labels.reverse(),
      times: times.reverse(),
    };
  }

  async totalWorkingTimeInMonths(userId: string): Promise<ChartResponse> {
    const { start, end } = this.getStartAndEndOfWeek({ type: 'month' });
    const results = await this.getPeriodDays(userId, start, end);

    const labels: string[] = [];
    const times: number[] = [];

    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      labels[i] = MONTHS[date.getMonth()];
      times[i] = 0;
    }

    for (const result of results) {
      const date = new Date(result.date);
      const index = labels.indexOf(MONTHS[date.getMonth()]);
      times[index] += result.time;
    }

    return {
      labels: labels.reverse(),
      times: times.reverse(),
    };
  }

  async distributionOfUsedApplications(userId: string): Promise<ChartResponse> {
    const results = await this.em.find(
      Day,
      {
        user_id: userId,
      },
      {
        orderBy: { date: 'DESC' },
      },
    );

    const labels: string[] = [];
    const times: number[] = [];

    for (const result of results) {
      const details = await this.detailsService.getDetailsByDay(result);
      for (const detail of details) {
        const index = labels.indexOf(detail.app_name);
        if (index === -1) {
          labels.push(detail.app_name);
          times.push(detail.app_open_time);
        } else {
          times[index] += detail.app_open_time;
        }
      }
    }

    return {
      labels,
      times,
    };
  }
}
