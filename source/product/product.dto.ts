import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, Min } from 'class-validator';

import { Product } from './product.entity';

export class ProductDto {

  @IsUUID()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public ingredients: string;

  @IsInt() @Min(1)
  public serve_people: number;

  @IsUrl() @IsOptional()
  public image_url?: string;

  @IsUUID()
  public restaurantId: string;

  @IsUUID()
  public categoryId: string;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public constructor({ id, name, description, ingredients, serve_people, image_url, restaurant, category }: Product) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.serve_people = serve_people;
    this.image_url = image_url;
    this.restaurantId = restaurant.id;
    this.categoryId = category.id;
  }

}

export class ProductCreateDto {

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public description: string;

  @IsString() @IsNotEmpty()
  public ingredients: string;

  @IsInt() @Min(1)
  public serve_people: number;

  @IsString() @IsOptional()
  public image_url?: string;

  @IsUUID()
  public restaurantId: string;

  @IsUUID()
  public categoryId: string;

}

export class ProductReadByIdDto {

  @IsUUID()
  public id: string;

}

export class ProductReadDto {

  @IsUUID()
  public restaurantId: string;

  @IsUUID() @IsOptional()
  public categoryId?: string;

}

export class ProductUpdateDto {

  @IsUUID() @IsOptional()
  public id?: string; // will be inject by path param.

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public description: string;

  @IsString() @IsNotEmpty()
  public ingredients: string;

  @IsInt() @Min(1)
  public serve_people: number;

  @IsUrl() @IsOptional()
  public image_url?: string;

}

export class ProductUpdateStatusDto {

  @IsUUID() @IsOptional()
  public id?: string; // will be inject by path param.

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

}

export class ProductDeleteByIdDto {

  @IsUUID()
  public id: string;

}
