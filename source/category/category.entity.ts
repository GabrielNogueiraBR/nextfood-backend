import { IsBoolean, IsDate, IsObject, IsString, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Product } from '../product/product.entity';

@Entity()
export class Category {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  @IsString()
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  @IsString()
  public icon: string;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  public isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  public updatedAt!: Date;

  @OneToMany(() => Product, (product) => product.category)
  @IsObject({ each: true })
  public products: Product[];

}
