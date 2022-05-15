import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { AddressDataCreateDto, AddressDto } from '../../address/address.dto';
import { Franchise } from '../franchise.entity/franchise.entity';
import { FranchiseScheduleCreateDto, FranchiseScheduleDto } from './franchise.schedule.dto';

export class FranchiseDto {

  @IsUUID()
  public id: string;

  @IsString()
  public name: string;

  @IsUUID()
  public restaurantId: string;

  @IsObject()
  @Type(() => AddressDto)
  public address: AddressDto;

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

  @IsUUID()
  public restaurantId: string;

  @IsString() @IsNotEmpty()
  public name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressDataCreateDto)
  public address: AddressDataCreateDto;

  @IsObject({ each: true })
  @ValidateNested()
  @Type(() => FranchiseScheduleCreateDto)
  public schedule: FranchiseScheduleCreateDto[];

}

export class FranchiseReadByIdDto {

  @IsUUID()
  public id: string;

}

export class FranchiseReadByRestaurantDto {

  @IsUUID() @IsOptional()
  public restaurantId?: string;

  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

}

export class FranchiseUpdateDto {

  @IsUUID() @IsOptional()
  public id?: string; // will be inject by path param.

  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @IsObject() @IsOptional()
  @ValidateNested()
  @Type(() => AddressDataCreateDto)
  public address?: AddressDataCreateDto;

  @IsOptional()
  @IsObject({ each: true })
  // @ValidateNested()
  @Type(() => FranchiseScheduleCreateDto)
  public schedule?: FranchiseScheduleCreateDto[];

}

export class FranchiseUpdateStatusDto {

  @IsUUID() @IsOptional()
  public id?: string; // will be inject by path param.

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

}

export class FranchiseDeleteByIdDto {

  @IsUUID()
  public id: string;

}
