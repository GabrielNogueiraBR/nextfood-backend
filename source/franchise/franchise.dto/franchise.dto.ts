import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, Length, ValidateNested } from 'class-validator';

import { AddressDataCreateDto, AddressDto } from '../../address/address.dto';
import { Franchise } from '../franchise.entity/franchise.entity';
import { FranchiseScheduleDataDto as FranchiseScheduleDataDto, FranchiseScheduleDto } from './franchise.schedule.dto';

export class FranchiseIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class FranchiseIdOptionalDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsUUID() @IsOptional()
  public id?: string;

}

export class FranchiseDto extends FranchiseIdDto {

  @ApiProperty({ type: 'string' })
  @IsString()
  public name: string;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public restaurantId: string;

  @ApiProperty({ type: AddressDataCreateDto })
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  public address: AddressDto;

  @ApiProperty({ type: FranchiseScheduleDataDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FranchiseScheduleDto)
  @Length(1, 7)
  public schedule: FranchiseScheduleDto[];

  public constructor({ id, name, address, schedule }: Franchise);
  public constructor({ id, name, restaurant, address, schedule }: Franchise) {
    super();
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

  @ApiProperty({ type: AddressDataCreateDto })
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDataCreateDto)
  public address: AddressDataCreateDto;

  @ApiProperty({ type: FranchiseScheduleDataDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FranchiseScheduleDataDto)
  @Length(1, 7)
  public schedule: FranchiseScheduleDataDto[];

}

export class FranchiseReadByIdDto extends FranchiseIdDto { }

export class FranchiseReadByRestaurantDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public restaurantId: string;

}

export class FranchiseUpdateDto extends FranchiseIdOptionalDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @ApiPropertyOptional({ type: AddressDataCreateDto })
  @IsObject() @IsOptional()
  @ValidateNested()
  @Type(() => AddressDataCreateDto)
  public address?: AddressDataCreateDto;

  @ApiProperty({ type: FranchiseScheduleDataDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FranchiseScheduleDataDto)
  @Length(1, 7)
  public schedule?: FranchiseScheduleDataDto[];

}

export class FranchiseDeleteByIdDto extends FranchiseIdDto { }
