import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { FranchiseProduct } from '../franchise.entity/franchise.product.entity';

export class FranchiseProductIdDto {

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public id: string;

}

export class FranchiseProductIdOptionalDto {

  @IsUUID() @IsOptional()
  public id?: string;

}

export class FranchiseProductDto extends FranchiseProductIdDto {

  @ApiProperty({ type: 'number' })
  @IsNumber()
  public price: number;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  public isActive: boolean;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public productId: string;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public franchiseId: string;

  public constructor({ id, price, isActive, product, franchise }: FranchiseProduct) {
    super();
    this.id = id;
    this.price = price;
    this.isActive = isActive;
    this.productId = product?.id;
    this.franchiseId = franchise?.id;
  }

}

export class FranchiseProductCreateDto {

  @ApiProperty({ type: 'number' })
  @IsNumber()
  public price: number;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public productId: string;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public franchiseId: string;

}

export class FranchiseProductReadDto {

  @ApiPropertyOptional({ type: 'string' })
  @IsUUID() @IsOptional()
  public productId?: string;

  @ApiPropertyOptional({ type: 'boolean', default: true })
  @IsBoolean() @IsOptional()
  public isActive?: boolean = true;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  public franchiseId: string;

}

export class FranchiseProductReadByIdDto extends FranchiseProductIdDto { }

export class FranchiseProductUpdateDto extends FranchiseProductIdOptionalDto {

  @ApiPropertyOptional({ type: 'number' })
  @IsNumber() @IsOptional()
  public price?: number;

  @ApiPropertyOptional({ type: 'boolean' })
  @Transform(({ value }) => value === 'true')
  @IsBoolean() @IsOptional()
  public isActive?: boolean;

}

export class FranchiseProductDeleteByIdDto extends FranchiseProductIdDto { }

