import { IsBoolean, IsNumber, IsObject, IsUUID } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Franchise } from '../franchise/franchise.entity/franchise.entity';
import { Product } from '../product/product.entity';

@Entity()
export class FranchiseProduct {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @Column({ type: 'double', length: 120 })
  @IsNumber()
  public price: string;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  public isActive: boolean;

  @ManyToOne(() => Product, (product) => product.fr_product, {
    onDelete: 'CASCADE', nullable: false,
  })
  @IsObject()
  public product!: Product;

  @ManyToOne(() => Franchise, (franchise) => franchise.fr_franchise, {
    onDelete: 'CASCADE', nullable: false,
  })
  @IsObject()
  public franchise!: Franchise;

}
