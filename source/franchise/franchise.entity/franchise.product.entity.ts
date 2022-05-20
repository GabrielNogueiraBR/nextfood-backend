import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '../../product/product.entity';
import { Franchise } from './franchise.entity';

@Entity()
export class FranchiseProduct {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'float' })
  public price: number;

  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @ManyToOne(() => Product, (product) => product.fr_product, {
    onDelete: 'CASCADE', nullable: false,
  })
  public product!: Product;

  @ManyToOne(() => Franchise, (franchise) => franchise.fr_franchise, {
    onDelete: 'CASCADE', nullable: false,
  })
  public franchise!: Franchise;

}
