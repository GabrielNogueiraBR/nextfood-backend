import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

export class RestaurantCreateDto {

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public description: string;

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

  @IsString()
  public id: string;

}

export class RestaurantDeleteByIdDto {

  @IsString()
  public id: string;

}

export class RestaurantCategoryCreateDto {

  @IsNumberString()
  public restaurantId: string; // Refers to restaurantId, and will be injected by path param.

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public icon: string;

}

export class RestaurantCategoryDeleteDto {

  @IsNumberString()
  public restaurantId: string; // Refers to restaurantId, and will be injected by path param.

  @IsUUID()
  public categoryId: string;

}
