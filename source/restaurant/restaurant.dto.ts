import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { Restaurant } from './restaurant.entity';

export class RestaurantDto {

  @IsUUID()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  public constructor({ id, name, description }: Restaurant) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

}

export class RestaurantCreateDto {

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public description: string;

}

export class RestaurantReadByIdDto {

  @IsUUID()
  public id: string;

}

export class RestaurantUpdateDto {

  @IsOptional() @IsUUID()
  public id?: string; // Will be injected by path param.

  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @IsOptional()
  @IsString() @IsNotEmpty()
  public description?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive?: boolean;

}

export class RestaurantDeleteByIdDto {

  @IsUUID()
  public id: string;

}
