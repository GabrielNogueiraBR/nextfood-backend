import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CategoryCreateDto {

  @ApiProperty()
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  public icon: string;

}

export class CategoryUpdateDto {

  @IsOptional() @IsUUID()
  public id?: string; // Will be injected by path param.

  @ApiProperty()
  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString() @IsNotEmpty()
  public icon?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive?: boolean;

}

export class CategoryReadByIdDto {

  @ApiProperty()
  @IsUUID()
  public id: string;

}

export class CategoryDeleteByIdDto {

  @ApiProperty()
  @IsUUID()
  public id: string;

}
