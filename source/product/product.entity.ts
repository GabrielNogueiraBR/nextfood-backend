/* eslint-disable @typescript-eslint/naming-convention */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from '../category/category.entity';
import { FranchiseProduct } from '../franchise/franchise.entity/franchise.product.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 256 })
  public description: string;

  @Column({ type: 'varchar', length: 999 })
  public ingredients: string;

  @Column({ type: 'int' })
  public serve_people: number;

  @Column({ type: 'varchar', nullable: true })
  public image_url?: string;

  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.products, {
    onDelete: 'CASCADE', nullable: false,
  })
  public restaurant!: Restaurant;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  public category!: Category;

  @OneToMany(() => FranchiseProduct, (franchise_product) => franchise_product.product)
  public fr_product: FranchiseProduct[];

}
