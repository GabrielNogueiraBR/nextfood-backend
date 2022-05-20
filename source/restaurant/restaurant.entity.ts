import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Franchise } from '../franchise/franchise.entity/franchise.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Restaurant {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 256 })
  public description: string;

  @Column({ type: 'boolean', default: true })
  public isActive: boolean = true;

  @OneToMany(() => Franchise, (franchise) => franchise.restaurant)
  public franchises: Franchise[];

  @OneToMany(() => Product, (product) => product.restaurant)
  @IsObject({ each: true })
  public products: Product[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

}
