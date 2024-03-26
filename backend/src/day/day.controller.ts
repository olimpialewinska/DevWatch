import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard.js';
import { DayService } from './day.service.js';
import { ChartResponse, DayCreate, DayUpdate, TodayPieChart } from './types.js';
import { Day } from './day_entity.js';
import { Pagination } from 'src/types/pagination.js';

@UseGuards(AuthGuard)
@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Post()
  async start(@Request() req: DayCreate): Promise<Day> {
    return await this.dayService.create(req.user.user_id);
  }

  @Get('history')
  async history(
    @Request() req: DayCreate,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<Pagination<Day>> {
    return await this.dayService.getHistory(req.user.user_id, limit, offset);
  }

  @Get('bar-chart-last-week')
  async getLineChartLastWeek(
    @Request() req: DayCreate,
  ): Promise<ChartResponse> {
    return await this.dayService.getBarChartLastWeek(req.user.user_id);
  }

  @Get('pie-chart-apps-today')
  async getAppsPieChartToday(
    @Request() req: DayCreate,
  ): Promise<TodayPieChart> {
    return await this.dayService.getAppsPieChartToday(req.user.user_id);
  }

  @Get('average-working-time-in-months')
  async getAverageWorkingTimeInMonths(
    @Request() req: DayCreate,
  ): Promise<ChartResponse> {
    return await this.dayService.getAverageWorkingTimeInMonths(
      req.user.user_id,
    );
  }

  @Get('numbers-of-apps-7-days')
  async numberOfAppsOpened7Days(
    @Request() req: DayCreate,
  ): Promise<ChartResponse> {
    return await this.dayService.numberOfAppsOpened7Days(req.user.user_id);
  }

  @Get('total-working-time-in-months')
  async totalWorkingTimeInMonths(
    @Request() req: DayCreate,
  ): Promise<ChartResponse> {
    return await this.dayService.totalWorkingTimeInMonths(req.user.user_id);
  }

  @Get('distribution-of-used-applications')
  async distributionOfUsedApplications(
    @Request() req: DayCreate,
  ): Promise<ChartResponse> {
    return await this.dayService.distributionOfUsedApplications(
      req.user.user_id,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return await this.dayService.delete(id);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Day | null> {
    return await this.dayService.getById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: DayUpdate): Promise<Day> {
    return await this.dayService.update(id, req.time, req.details);
  }
}
