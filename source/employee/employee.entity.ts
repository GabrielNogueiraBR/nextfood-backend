import { IsBoolean, IsDate, IsObject, IsString, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Franchise } from '../franchise/franchise.entity/franchise.entity';

@Entity()
export class Employee {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @Column({ type: 'varchar', length: 60 })
  @IsString()
  public name: string;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  public hiredDate: Date;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  public isActive: boolean;

  @ManyToOne(() => Franchise, (franchise) => franchise.employees, {
    nullable: false,
  })
  @IsObject()
  public franchise!: Franchise;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  public updatedAt!: Date;

}
