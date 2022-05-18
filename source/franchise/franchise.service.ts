import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RestaurantService } from './../restaurant/restaurant.service';
import { FranchiseCreateDto, FranchiseDto, FranchiseReadByRestaurantDto, FranchiseUpdateDto } from './franchise.dto/franchise.dto';
import { FranchiseScheduleCreateDto, FranchiseScheduleDeleteDto, FranchiseScheduleDto, FranchiseScheduleUpdateDto } from './franchise.dto/franchise.schedule.dto';
import { Franchise } from './franchise.entity/franchise.entity';
import { FranchiseSchedule } from './franchise.entity/franchise.schedule';

@Injectable()
export class FranchiseService {

  public constructor(
    @InjectRepository(Franchise)
    private readonly franchiseRepository: Repository<Franchise>,
    @InjectRepository(FranchiseSchedule)
    private readonly scheduleRepository: Repository<FranchiseSchedule>,
    private readonly restaurantService: RestaurantService,
  ) { }

  /**
   * Create a franchise.
   * @param franchiseDto
   */
  public async createFranchise(franchiseDto: FranchiseCreateDto): Promise<FranchiseDto> {
    const { name, restaurantId, address, schedule } = franchiseDto;

    const restaurantEntity = await this.restaurantService.readRestaurantById(restaurantId);
    let franchiseEntity = this.franchiseRepository.create({
      name,
      address,
      schedule,
      restaurant: restaurantEntity,
    });
    franchiseEntity = await this.franchiseRepository.save(franchiseEntity);

    return new FranchiseDto(franchiseEntity);
  }

  /**
   * Read a franchise by id.
   * @param id
   */
  public async readFranchiseById(id: string): Promise<FranchiseDto> {
    const franchiseEntity = await this.franchiseRepository.findOneBy({ id });

    if (!franchiseEntity) throw new NotFoundException('Franchise not found!');

    return new FranchiseDto(franchiseEntity);
  }

  /**
   * Read franchise by restaurant filter params.
   * @param params
   */
  public async readFranchiseByRestaurant(params: FranchiseReadByRestaurantDto): Promise<FranchiseDto[]> {
    const { restaurantId } = params;

    const franchiseEntities = await this.franchiseRepository.find({
      where: {
        restaurant: {
          id: restaurantId,
        },
      },
    });

    return franchiseEntities.map((franchise) => new FranchiseDto(franchise));
  }

  /**
   * Update a franchise by id.
   * @param params
   */
  public async updateFranchiseById(params: FranchiseUpdateDto): Promise<FranchiseDto> {
    const { id, ...rest } = params;

    const franchiseEntity = await this.franchiseRepository.findOneBy({ id });

    if (!franchiseEntity) throw new NotFoundException('Franchise not found!');

    const franchiseUpdated = await this.franchiseRepository.save({
      ...franchiseEntity,
      ...rest,
    });

    return new FranchiseDto(franchiseUpdated);
  }

  /**
   * Delete a franchise by id.
   * @param id
   */
  public async deleteFranchiseById(id: string): Promise<void> {
    await this.readFranchiseById(id);
    await this.franchiseRepository.delete(id);

    return;
  }

  /**
   * Delete a franchise schedule.
   * @param params
   */
  public async createFranchiseSchedule(params: FranchiseScheduleCreateDto): Promise<FranchiseScheduleDto> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { franchiseId, weekDay, end_time, start_time } = params;
    const franchiseEntity = await this.readFranchiseById(franchiseId);
    const schedule = franchiseEntity.schedule;

    if (schedule.length === 7) {
      throw new BadRequestException('Franchise schedule has already reached the limit of 7 days.');
    }

    const scheduleEntity = schedule.find((schedule) => schedule.weekDay === weekDay);

    if (scheduleEntity) throw new BadRequestException('Schedule for this week day already exists, try to edit it.');

    const franchiseScheduleUpdated = await this.scheduleRepository.save({
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
    const franchiseEntity = await this.readFranchiseById(franchiseId);
    const scheduleEntity = franchiseEntity.schedule.find((schedule) => schedule.id === scheduleId);

    if (!scheduleEntity) throw new BadRequestException('Schedule not found!');

    const franchiseScheduleUpdated = await this.scheduleRepository.save({
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
    const franchiseEntity = await this.readFranchiseById(franchiseId);
    const scheduleEntity = franchiseEntity.schedule.find((schedule) => schedule.id === scheduleId);

    if (!scheduleEntity) throw new BadRequestException('Schedule not found!');

    await this.scheduleRepository.delete(scheduleEntity.id);

    return;
  }

}
