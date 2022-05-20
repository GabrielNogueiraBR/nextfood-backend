import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, Min } from 'class-validator';

import { Product } from './product.entity';

export class ProductIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class ProductIdOptionalDto {

  @IsUUID() @IsOptional()
  public id?: string;

}

export class ProductDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public description: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public ingredients: string;

  @ApiProperty({ type: 'number' })
  @IsInt() @Min(1)
  public serve_people: number;

  @ApiPropertyOptional({ type: 'string' })
  @IsUrl() @IsOptional()
  public image_url?: string;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public restaurantId: string;

  @ApiProperty({ type: 'string' })
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

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public description: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public ingredients: string;

  @ApiProperty({ type: 'number' })
  @IsInt() @Min(1)
  public serve_people: number;

  @ApiPropertyOptional({ type: 'string' })
  @IsString() @IsOptional()
  public image_url?: string;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public restaurantId: string;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public categoryId: string;

}

export class ProductReadByIdDto extends ProductIdDto { }

export class ProductReadDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public restaurantId: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsUUID() @IsOptional()
  public categoryId?: string;

  @ApiProperty({ type: 'boolean' })
  @Transform((o) => o.value === 'true')
  @IsBoolean() @IsOptional()
  public isActive?: boolean = true;

}

export class ProductUpdateDto extends ProductIdOptionalDto {

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public description: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public ingredients: string;

  @ApiProperty({ type: 'number' })
  @IsInt() @Min(1)
  public serve_people: number;

  @ApiPropertyOptional({ type: 'string' })
  @IsUrl() @IsOptional()
  public image_url?: string;

}

export class ProductDeleteByIdDto extends ProductIdDto { }
