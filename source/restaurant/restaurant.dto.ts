import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { Restaurant } from './restaurant.entity';

export class RestaurantDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public description: string;

  public constructor({ id, name, description }: Restaurant) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

}

export class RestaurantCreateDto {

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public description: string;

}

export class RestaurantReadByIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class RestaurantUpdateDto {

  @IsOptional() @IsUUID()
  public id?: string; // Will be injected by path param.

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public description?: string;

  @ApiProperty({ type: 'boolean' })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive?: boolean;

}

export class RestaurantDeleteByIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}
