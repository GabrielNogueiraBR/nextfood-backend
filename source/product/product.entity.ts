/* eslint-disable @typescript-eslint/naming-convention */
import { IsBoolean, IsInt, IsObject, IsString, IsUUID } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from '../category/category.entity';
import { FranchiseProduct } from '../franchise/franchise.entity/franchise.product.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  @IsString()
  public name: string;

  @Column({ type: 'varchar', length: 256 })
  @IsString()
  public description: string;

  @Column({ type: 'varchar', length: 999 })
  @IsString()
  public ingredients: string;

  @Column({ type: 'int' })
  @IsInt()
  public amountP: string;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  public isActive: boolean;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.products, {
    onDelete: 'CASCADE', nullable: false,
  })
  @IsObject()
  public restaurant!: Restaurant;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  @IsObject()
  public category!: Category;

  @OneToMany(() => FranchiseProduct, (franchise_product) => franchise_product.product)
  @IsObject({ each: true })
  public fr_product: FranchiseProduct[];

}
