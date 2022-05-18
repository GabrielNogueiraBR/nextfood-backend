import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Franchise } from '../franchise/franchise.entity/franchise.entity';

@Entity()
export class Table {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'int' })
  public quantity: number;

  @Column({ type: 'boolean', default: true })
  public isEmpty: boolean = true;

  @Column({ type: 'boolean', default: true })
  public isActive: boolean = true;

  @ManyToOne(() => Franchise, (franchise) => franchise.employees, {
    nullable: false,
  })
  public franchise!: Franchise;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

}
