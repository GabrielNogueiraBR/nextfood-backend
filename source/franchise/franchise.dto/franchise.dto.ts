import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, IsUUID, ValidateNested } from 'class-validator';

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
  public address: AddressDto;

  @IsObject()
  public schedule: FranchiseScheduleDto[];

  public constructor({ id, name, restaurant, address, schedule }: Franchise) {
    this.id = id;
    this.name = name;
    this.restaurantId = restaurant.id;
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
