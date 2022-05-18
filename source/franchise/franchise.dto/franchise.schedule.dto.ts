/* eslint-disable no-useless-escape */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsUUID, Matches } from 'class-validator';

import { WeekDay } from '../../utils/weekday.enum';
import { FranchiseSchedule } from './../franchise.entity/franchise.schedule';

export class FranchiseScheduleIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class FranchiseScheduleIdOptionalDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsUUID() @IsOptional()
  public id?: string;

}

export class FranchiseScheduleDto extends FranchiseScheduleIdDto {

  @IsIn(Object.values(WeekDay))
  public weekDay: WeekDay;

  @ApiProperty({
    type: 'string', pattern: '^([01]\d|2[0-3]):([0-5]\d)$', example: '10:00', description: 'Is in 24 hour format',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  public start_time: string;

  @ApiProperty({
    type: 'string', pattern: '^([01]\d|2[0-3]):([0-5]\d)$', example: '20:00', description: 'Is in 24 hour format',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  public end_time: string;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public constructor({ id, weekDay, start_time, end_time }: FranchiseSchedule) {
    super();
    this.id = id;
    this.weekDay = weekDay;
    this.start_time = start_time;
    this.end_time = end_time;
  }

}

export class FranchiseScheduleDataDto {

  @ApiProperty({ type: 'enum', enum: WeekDay })
  @IsIn(Object.values(WeekDay))
  public weekDay: WeekDay;

  @ApiProperty({
    type: 'string', pattern: '^([01]\d|2[0-3]):([0-5]\d)$', example: '10:00', description: 'Is in 24 hour format',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  public start_time: string;

  @ApiProperty({
    type: 'string', pattern: '^([01]\d|2[0-3]):([0-5]\d)$', example: '20:00', description: 'Is in 24 hour format',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  public end_time: string;

}

export class FranchiseScheduleCreateDto extends FranchiseScheduleDataDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsUUID() @IsOptional()
  public franchiseId: string; // Will be injected by path param.

}

export class FranchiseScheduleUpdateDto extends FranchiseScheduleDataDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsUUID() @IsOptional()
  public franchiseId: string; // Will be injected by path param.

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public scheduleId: string;

}

export class FranchiseScheduleDeleteDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsUUID() @IsOptional()
  public franchiseId?: string; // Will be injected by path param.

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public scheduleId: string;

}
