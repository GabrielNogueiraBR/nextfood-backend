import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

import { Table } from './table.entity';

export class TableIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class TableIdOptionalDto {

  @IsUUID() @IsOptional()
  public id?: string;

}

export class TableDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty({ type: 'number' })
  @IsNumber() @Min(1)
  public quantity: number;

  @ApiProperty({ type: 'boolean' })
  @IsISO8601()
  public isEmpty: boolean;

  @ApiProperty({ type: 'boolean' })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

  public constructor({ id, name, quantity, isEmpty, isActive }: Table) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.isEmpty = isEmpty;
    this.isActive = isActive;
  }

}

export class TableCreateDto {

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty({ type: 'number' })
  @IsNumber() @Min(1)
  public quantity: number;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public franchiseId: string;

}

export class TableReadByFranchiseDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public franchiseId: string;

  @ApiPropertyOptional({ type: 'boolean', default: true })
  @Transform(({ value }) => value === 'true')
  @IsBoolean() @IsOptional()
  public isEmpty?: boolean = true;

  @ApiPropertyOptional({ type: 'boolean', default: true })
  @Transform(({ value }) => value === 'true')
  @IsBoolean() @IsOptional()
  public isActive?: boolean = true;

}

export class TableReadByIdDto extends TableIdDto { }

export class TableUpdateDto extends TableIdOptionalDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @ApiProperty({ type: 'number' })
  @IsNumber() @Min(1) @IsOptional()
  public quantity?: number;

  @ApiPropertyOptional({ type: 'string', format: 'date', example: '2022-01-01' })
  @IsOptional() @IsISO8601()
  public isEmpty?: boolean;

  @ApiProperty({ type: 'boolean', default: true })
  @Transform(({ value }) => value === 'true')
  @IsBoolean() @IsOptional()
  public isActive?: boolean;

}

export class TableDeleteByIdDto extends TableIdDto { }

