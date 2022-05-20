import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsISO8601, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { Employee } from './employee.entity';

export class EmployeeDto {

  @IsUUID()
  public id: string;

  @IsString() @IsNotEmpty()
  public name: string;

  @IsISO8601()
  public hiredDate: string;

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

  @ApiProperty({ type: 'string' })
  @IsISO8601()
  public hiredDate: string;

  @ApiProperty({ type: 'string' })
  @IsString() @IsNotEmpty()
  public franchiseId: string;

}

export class EmployeeReadByFranchiseDto {

  @ApiProperty({ type: 'string' })
  @IsUUID() @IsOptional()
  public franchiseId: string;

}

export class EmployeeReadByIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class EmployeeUpdateDto {

  @IsOptional()
  @IsUUID()
  public id?: string; // will be inject by path param.

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsISO8601()
  public hiredDate?: string;

}

export class EmployeeUpdateStatusDto {

  @IsUUID() @IsOptional()
  public id?: string; // will be inject by path param.

  @ApiProperty({ type: 'boolean' })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

}

export class EmployeeDeleteByIdDto {

  @ApiProperty()
  @IsUUID()
  public id: string;

}

