import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CategoryCreateDto {

  @IsString() @IsNotEmpty()
  public name: string;

  @IsString() @IsNotEmpty()
  public icon: string;

}

export class CategoryUpdateDto {

  @IsOptional() @IsUUID()
  public id?: string; // Will be injected by path param.

  @IsOptional()
  @IsString() @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString() @IsNotEmpty()
  public icon: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

}

export class CategoryReadByIdDto {

  @IsUUID()
  public id: string;

}

export class CategoryDeleteByIdDto {

  @IsUUID()
  public id: string;

}
