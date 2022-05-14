import { IsDate, IsObject, IsString, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Franchise } from '../franchise/franchise.entity';

@Entity()
export class Address {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @Column({ type: 'varchar', length: 60 })
  @IsString()
  public country: string;

  @Column({ type: 'varchar', length: 60 })
  @IsString()
  public state: string;

  @Column({ type: 'varchar', length: 60 })
  @IsString()
  public city: string;

  @Column({ type: 'varchar', length: 60 })
  @IsString()
  public borough: string;

  @Column({ type: 'varchar', length: 60 })
  @IsString()
  public street: string;

  @Column({ type: 'varchar', length: 60 })
  @IsString()
  public number: string;

  @OneToOne(
    () => Franchise,
    (franchise) => franchise.address,
    { onDelete: 'CASCADE' },
  )
  @IsObject()
  public franchise!: Franchise;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  public updatedAt!: Date;

}
