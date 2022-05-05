import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class RestaurantCreateDto {

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public description: string;

  @IsString() @IsNotEmpty() @IsOptional()
  public categories?: string;

}

export class RestaurantUpdateDto {

  @IsOptional() @IsNumberString()
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
  public isActive: boolean;

}

export class RestaurantReadByIdDto {

  @IsNumberString()
  public id: string;

}

export class RestaurantDeleteByIdDto {

  @IsNumberString()
  public id: string;

}

export class RestaurantCategoryCreateDto {

  @IsOptional() @IsNumberString()
  public id?: string; // Refers to restaurantId, and will be injected by path param.

  @IsString() @IsNotEmpty()
  public name: string;

  @IsOptional() @IsString() @IsNotEmpty()
  public icon: string;

}
