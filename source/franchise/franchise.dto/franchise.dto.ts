import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { AddressDataCreateDto, AddressDto } from '../../address/address.dto';
import { Franchise } from '../franchise.entity/franchise.entity';
import { FranchiseScheduleCreateDto, FranchiseScheduleDto } from './franchise.schedule.dto';

export class FranchiseDto {

  @ApiProperty()
  @IsUUID()
  public id: string;

  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsUUID()
  public restaurantId: string;

  @ApiProperty({
    type: AddressDataCreateDto,
    properties: {
      country: { type: 'string' },
      state: { type: 'string' },
      city: { type: 'string' },
      borough: { type: 'string' },
      street: { type: 'string' },
      complement: { type: 'string', nullable: true },
      number: { type: 'number', nullable: true },
    },
  })
  @IsObject()
  @Type(() => AddressDto)
  public address: AddressDto;

  @ApiProperty({
    type: [ FranchiseScheduleCreateDto ],
    example: [
      {
        weekDay: 'string',
        start_time: 'string',
        end_time: 'string',
      },
    ],
  })
  @IsObject({ each: true })
  @Type(() => FranchiseScheduleDto)
  public schedule: FranchiseScheduleDto[];

  public constructor({ id, name, address, schedule }: Franchise);
  public constructor({ id, name, restaurant, address, schedule }: Franchise) {
    this.id = id;
    this.name = name;
    this.restaurantId = restaurant?.id;
    this.address = new AddressDto(address);
    this.schedule = schedule.map((schedule) => new FranchiseScheduleDto(schedule));
  }

}

export class FranchiseCreateDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public restaurantId: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty({
    type: AddressDataCreateDto,
    properties: {
      country: { type: 'string' },
      state: { type: 'string' },
      city: { type: 'string' },
      borough: { type: 'string' },
      street: { type: 'string' },
      complement: { type: 'string', nullable: true },
      number: { type: 'number', nullable: true },
    },
  })
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDataCreateDto)
  public address: AddressDataCreateDto;

  @ApiProperty({
    type: [ FranchiseScheduleCreateDto ],
    example: [
      {
        weekDay: 'string',
        start_time: 'string',
        end_time: 'string',
      },
    ],
  })
  @IsObject({ each: true })
  @ValidateNested()
  @Type(() => FranchiseScheduleCreateDto)
  public schedule: FranchiseScheduleCreateDto[];

}

export class FranchiseReadByIdDto {

  @ApiProperty()
  @IsUUID()
  public id: string;

}

export class FranchiseReadByRestaurantDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsUUID() @IsOptional()
  public restaurantId?: string;

}

export class FranchiseUpdateDto {

  @IsUUID() @IsOptional()
  public id?: string; // will be inject by path param.

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @ApiPropertyOptional({
    type: AddressDataCreateDto,
    properties: {
      country: { type: 'string' },
      state: { type: 'string' },
      city: { type: 'string' },
      borough: { type: 'string' },
      street: { type: 'string' },
      complement: { type: 'string', nullable: true },
      number: { type: 'number', nullable: true },
    },
  })
  @IsObject() @IsOptional()
  @ValidateNested()
  @Type(() => AddressDataCreateDto)
  public address?: AddressDataCreateDto;

  @ApiProperty({
    type: [ FranchiseScheduleCreateDto ],
    example: [
      {
        weekDay: 'string',
        start_time: 'string',
        end_time: 'string',
      },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FranchiseScheduleCreateDto)
  public schedule?: FranchiseScheduleCreateDto[];

}

export class FranchiseUpdateStatusDto {

  @IsUUID() @IsOptional()
  public id?: string; // will be inject by path param.

  @ApiProperty({ type: 'boolean' })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

}

export class FranchiseDeleteByIdDto {

  @ApiProperty()
  @IsUUID()
  public id: string;

}
