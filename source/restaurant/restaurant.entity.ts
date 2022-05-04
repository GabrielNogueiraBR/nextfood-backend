import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';

import { RestaurantCreateDto } from './restaurant.dto';

export class RestaurantCategory {

  @IsString()
  public name: string;

  @IsString()
  public icon: string;

  @IsBoolean()
  public isActive: boolean;

}

export class Restaurant {

  @IsString()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsBoolean()
  public isActive: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RestaurantCategory)
  public categories: RestaurantCategory[];

  public constructor({ name, description }: RestaurantCreateDto) {
    this.name = name;
    this.description = description;
    this.isActive = true;
    this.categories = [ ];
  }

}
