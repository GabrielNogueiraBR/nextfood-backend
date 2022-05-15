import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  public description: string;

}

export class RestaurantReadByIdDto {

  @ApiProperty()
  @IsUUID()
  public id: string;

}

export class RestaurantUpdateDto {

  @IsOptional() @IsUUID()
  public id?: string; // Will be injected by path param.

  @ApiProperty()
  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString() @IsNotEmpty()
  public description?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive?: boolean;

}

export class RestaurantDeleteByIdDto {

  @ApiProperty()
  @IsUUID()
  public id: string;

}
