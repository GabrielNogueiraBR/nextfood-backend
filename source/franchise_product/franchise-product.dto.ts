import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Column } from 'typeorm';

import { FranchiseProduct } from './franchise-product.entity';

export class FranchiseProductDto {

  @IsUUID()
  public id: string;

  @Column({ type: 'double', length: 120 })
  @IsNumber()
  public price: string;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  public isActive: boolean;

  @IsUUID()
  public productId: string;

  @IsUUID()
  public franchiseId: string;

  public constructor({ id, price, product, franchise }: FranchiseProduct) {
    this.id = id;
    this.price = price;
    this.productId = product?.id;
    this.franchiseId = franchise?.id;
  }

}

export class FranchiseProductCreateDto {

  @IsString() @IsNotEmpty()
  public price: string;

  @IsUUID()
  public productId: string;

  @IsUUID()
  public franchiseId: string;

}

export class FranchiseProductReadByIdDto {

  @IsUUID()
  public id: string;

}

export class FranchiseProductReadByProductDto {

  @IsUUID() @IsOptional()
  public productId?: string;

}

export class FranchiseProductReadByFranchiseDto {

  @IsUUID() @IsOptional()
  public franchiseId?: string;

}

export class FranchiseProductUpdateDto {

  @IsUUID() @IsOptional()
  public id?: string; // will be inject by path param.

  @IsString() @IsNotEmpty()
  public price: string;

}

export class FranchiseProductUpdateStatusDto {

  @IsUUID() @IsOptional()
  public id?: string; // will be inject by path param.

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  public isActive: boolean;

}

export class FranchiseProductDeleteByIdDto {

  @IsUUID()
  public id: string;

}

