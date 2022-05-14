import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { AddressDataCreateDto } from './../address/address.dto';

export class FranchiseCreateDto {

  @IsUUID()
  public restaurantId: string;

  @IsString() @IsNotEmpty()
  public name: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDataCreateDto)
  public address?: Omit<AddressDataCreateDto, 'restaurantId'>;

}
