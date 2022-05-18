import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsISO8601, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { Employee } from './employee.entity';

export class EmployeeIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class EmployeeIdOptionalDto {

  @IsUUID() @IsOptional()
  public id?: string;

}

export class EmployeeDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty({ type: 'string', format: 'date', example: '2022-01-01' })
  @IsISO8601()
  public hiredDate: string;

  @ApiProperty({ type: 'boolean' })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

  public constructor({ id, name, hiredDate, isActive }: Employee) {
    this.id = id;
    this.name = name;
    this.hiredDate = hiredDate;
    this.isActive = isActive;
  }

}

export class EmployeeCreateDto {

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public name: string;

  @ApiProperty({ type: 'string', format: 'date', example: '2022-01-01' })
  @IsISO8601()
  public hiredDate: string;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public franchiseId: string;

}

export class EmployeeReadByFranchiseDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public franchiseId: string;

  @ApiProperty({ type: 'boolean', default: true })
  @Transform(({ value }) => value === 'true')
  @IsBoolean() @IsOptional()
  public isActive?: boolean = true;

}

export class EmployeeReadByIdDto extends EmployeeIdDto { }

export class EmployeeUpdateDto extends EmployeeIdOptionalDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @ApiPropertyOptional({ type: 'string', format: 'date', example: '2022-01-01' })
  @IsOptional()
  @IsISO8601()
  public hiredDate?: string;

  @ApiProperty({ type: 'boolean' })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

}

export class EmployeeDeleteByIdDto extends EmployeeIdDto { }

