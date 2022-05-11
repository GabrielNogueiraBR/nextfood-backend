import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

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
  public name: string;

  @IsOptional()
  @IsString() @IsNotEmpty()
  public description: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

}

export class RestaurantDeleteByIdDto {

  @IsUUID()
  public id: string;

}
