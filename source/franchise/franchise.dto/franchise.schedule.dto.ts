import { IsIn, IsString, IsUUID, Matches } from 'class-validator';

import { WeekDay } from '../../utils/weekday.enum';
import { FranchiseSchedule } from './../franchise.entity/franchise.schedule';

export class FranchiseScheduleDto {

  @IsUUID()
  public id: string;

  @IsIn(Object.values(WeekDay))
  public weekDay: WeekDay;

  @IsString()
  public start_time: string;

  @IsString()
  public end_time: string;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public constructor({ id, weekDay, start_time, end_time }: FranchiseSchedule) {
    this.id = id;
    this.weekDay = weekDay;
    this.start_time = start_time;
    this.end_time = end_time;
  }

}

export class FranchiseScheduleCreateDto {

  @IsIn(Object.values(WeekDay))
  public weekDay: WeekDay;

  @Matches(/^(?:0?\d|1[0-2]):[0-5]\d(am|pm)$/g)
  public start_time: string;

  @Matches(/^(?:0?\d|1[0-2]):[0-5]\d(am|pm)$/g)
  public end_time: string;

}
