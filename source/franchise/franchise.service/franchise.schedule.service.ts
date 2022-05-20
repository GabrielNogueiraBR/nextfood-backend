import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FranchiseScheduleCreateDto, FranchiseScheduleDeleteDto, FranchiseScheduleDto, FranchiseScheduleUpdateDto } from '../franchise.dto/franchise.schedule.dto';
import { FranchiseSchedule } from '../franchise.entity/franchise.schedule';
import { FranchiseService } from './franchise.service';

@Injectable()
export class FranchiseScheduleService {

  public constructor(
    @InjectRepository(FranchiseSchedule)
    private readonly repository: Repository<FranchiseSchedule>,
    private readonly franchiseService: FranchiseService,
  ) { }

  /**
   * Delete a franchise schedule.
   * @param params
   */
  public async createFranchiseSchedule(params: FranchiseScheduleCreateDto): Promise<FranchiseScheduleDto> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { franchiseId, weekDay, end_time, start_time } = params;
    const franchiseEntity = await this.franchiseService.readFranchiseById(franchiseId);
    const schedule = franchiseEntity.schedule;

    if (schedule.length === 7) {
      throw new BadRequestException('Franchise schedule has already reached the limit of 7 days.');
    }

    const scheduleEntity = schedule.find((schedule) => schedule.weekDay === weekDay);

    if (scheduleEntity) throw new BadRequestException('Schedule for this week day already exists, try to edit it.');

    const franchiseScheduleUpdated = await this.repository.save({
      franchise: franchiseEntity,
      weekDay: weekDay,
      start_time: start_time,
      end_time: end_time,
    });

    return new FranchiseScheduleDto(franchiseScheduleUpdated);
  }

  /**
   * Delete a franchise schedule.
   * @param params
   */
  public async updateFranchiseSchedule(params: FranchiseScheduleUpdateDto): Promise<FranchiseScheduleDto> {
    const { franchiseId, scheduleId, ...rest } = params;
    const franchiseEntity = await this.franchiseService.readFranchiseById(franchiseId);
    const scheduleEntity = franchiseEntity.schedule.find((schedule) => schedule.id === scheduleId);

    if (!scheduleEntity) throw new BadRequestException('Schedule not found!');

    const franchiseScheduleUpdated = await this.repository.save({
      ...scheduleEntity,
      ...rest,
    });

    return new FranchiseScheduleDto(franchiseScheduleUpdated);
  }

  /**
   * Delete a franchise schedule.
   * @param params
   */
  public async deleteFranchiseSchedule(params: FranchiseScheduleDeleteDto): Promise<void> {
    const { franchiseId, scheduleId } = params;
    const franchiseEntity = await this.franchiseService.readFranchiseById(franchiseId);
    const scheduleEntity = franchiseEntity.schedule.find((schedule) => schedule.id === scheduleId);

    if (!scheduleEntity) throw new BadRequestException('Schedule not found!');

    await this.repository.delete(scheduleEntity.id);

    return;
  }

}
