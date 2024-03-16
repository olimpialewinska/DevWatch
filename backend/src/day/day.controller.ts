import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Delete,
  Put,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard.js';
import { DayService } from './day.service.js';
import { DayCreate, DayUpdate } from './types.js';
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
    return await this.dayService.update(id, req.time);
  }
}
