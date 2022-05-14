import { IsBoolean, IsDate, IsObject, IsString, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Address } from '../address/address.entity';
import { Employee } from '../employee/employee.entity';
import { Restaurant } from '../restaurant/restaurant.entity';
import { WeekDay } from '../utils/weekday.enum';

@Entity()
export class Franchise {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  @IsString()
  public name: string;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  public isActive: boolean;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.franchises, {
    onDelete: 'CASCADE', nullable: false,
  })
  @IsObject()
  public restaurant!: Restaurant;

  @OneToOne(() => Address, (address) => address.franchise, {
    cascade: true, eager: true, nullable: false,
  })
  @JoinColumn()
  @IsObject()
  public address!: Address;

  @OneToMany(() => Employee, (employee) => employee.franchise)
  @IsObject({ each: true })
  public employees: Employee[];

  @OneToMany(() => FranchiseSchedule, (schedule) => schedule.franchise, {
    onDelete: 'CASCADE',
  })
  @IsObject()
  public schedule!: FranchiseSchedule[];

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  public updatedAt!: Date;

}

@Entity()
export class FranchiseSchedule {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @Column({ type: 'enum', enum: WeekDay })
  @IsString()
  public weekDay: WeekDay;

  @Column({ type: 'timestamp' })
  @IsString()
  public start_datetime: Date;

  @Column({ type: 'timestamp' })
  @IsString()
  public end_datetime: Date;

  @OneToOne(() => Franchise, (franchise) => franchise.address, {
    nullable: false,
  })
  @JoinColumn()
  @IsObject()
  public franchise!: Franchise;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  public updatedAt!: Date;

}
