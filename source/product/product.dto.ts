import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

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

  @IsInt()
  public amountP: string;

  @IsUUID()
  public restaurantId: string;

  @IsUUID()
  public categoryId: string;

  public constructor({ id, name, restaurant, category }: Product) {
    this.id = id;
    this.name = name;
    this.restaurantId = restaurant?.id;
    this.categoryId = category?.id;
  }

}

export class ProductCreateDto {

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public description: string;

  @IsString() @IsNotEmpty()
  public ingredients: string;

  @IsInt() @IsNotEmpty()
  public amountP: string;

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

  @IsInt() @IsNotEmpty()
  public amountP: string;

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

