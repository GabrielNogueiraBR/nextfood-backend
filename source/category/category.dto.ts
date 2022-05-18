import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { Category } from './category.entity';

export class CategoryIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class CategoryIdOptionalDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class CategoryDto extends CategoryIdDto {

  @ApiProperty({ type: 'string' })
  @IsString()
  public name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  public icon: string;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  public isActive: boolean;

  public constructor({ id, name, icon, isActive }: Category) {
    super();
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.isActive = isActive;
  }

}

export class CategoryCreateDto {

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public icon: string;

}

export class CategoryUpdateDto extends CategoryIdOptionalDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public icon?: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive?: boolean;

}

export class CategoryReadByIdDto extends CategoryIdDto { }

export class CategoryDeleteByIdDto extends CategoryIdDto { }
