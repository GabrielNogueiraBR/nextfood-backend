import { IsBoolean, IsDate, IsObject, IsString, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Franchise } from '../franchise/franchise.entity/franchise.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Restaurant {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  @IsString()
  public name: string;

  @Column({ type: 'varchar', length: 256 })
  @IsString()
  public description: string;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  public isActive: boolean;

  @OneToMany(() => Franchise, (franchise) => franchise.restaurant)
  @IsObject({ each: true })
  public franchises: Franchise[];

  @OneToMany(() => Product, (product) => product.restaurant)
  @IsObject({ each: true })
  public products: Product[];

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  public updatedAt!: Date;

}
