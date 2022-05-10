import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class RestaurantCreateDto {

  @IsString() @IsNotEmpty()
  @Min(2) @Max(120)
  public name: string;

  @IsString() @IsNotEmpty()
  @Min(10) @Max(256)
  public description: string;

}

export class RestaurantReadByIdDto {

  @IsUUID()
  public id: string;

}

export class RestaurantUpdateDto extends RestaurantCreateDto {

  @IsOptional() @IsUUID()
  public id?: string; // Will be injected by path param.

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

}

export class RestaurantDeleteByIdDto {

  @IsUUID()
  public id: string;

}
