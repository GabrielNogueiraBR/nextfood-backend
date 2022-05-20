
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Product } from '../product/product.entity';

@Entity()
export class Category {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  public icon: string; // This refers to the frontend lib icon name.

  @Column({ type: 'boolean', default: true })
  public isActive: boolean = true;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @OneToMany(() => Product, (product) => product.category)
  public products: Product[];

}
