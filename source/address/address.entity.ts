import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Franchise } from '../franchise/franchise.entity/franchise.entity';

@Entity()
export class Address {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 60 })
  public country: string;

  @Column({ type: 'varchar', length: 60 })
  public state: string;

  @Column({ type: 'varchar', length: 60 })
  public city: string;

  @Column({ type: 'varchar', length: 60 })
  public borough: string;

  @Column({ type: 'varchar', length: 60 })
  public street: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  public complement: string;

  @Column({ type: 'int', nullable: true })
  public streetNumber: number;

  @OneToOne(() => Franchise, (franchise) => franchise.address, {
    onDelete: 'CASCADE',
  })
  public franchise!: Franchise;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

}
