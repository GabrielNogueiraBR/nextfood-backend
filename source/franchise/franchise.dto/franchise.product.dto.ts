import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Column } from 'typeorm';

import { FranchiseProduct } from '../franchise.entity/franchise.product.entity';

export class FranchiseProductDto {

  @IsUUID()
  public id: string;

  @Column({ type: 'double' })
  @IsNumber()
  public price: number;

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

  @IsNumber()
  public price: number;

  @IsUUID()
  public productId: string;

  @IsUUID()
  public franchiseId: string;

}

export class FranchiseProductReadDto {

  @IsUUID() @IsOptional()
  public productId?: string;

  @IsUUID()
  public franchiseId: string;

}

export class FranchiseProductReadByIdDto {

  @IsUUID()
  public id: string;

}

export class FranchiseProductUpdateDto {

  @IsUUID() @IsOptional()
  public id?: string; // will be inject by path param.

  @IsNumber()
  public price: number;

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

