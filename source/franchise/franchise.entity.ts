import { IsBoolean, IsDate, IsObject, IsString, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Address } from '../address/address.entity';
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
    nullable: false,
    onDelete: 'CASCADE',
  })
  @IsObject()
  public restaurant: Restaurant;

  @OneToOne(() => Address, (address) => address.franchise, {
    nullable: false, eager: true,
  })
  @JoinColumn()
  @IsObject()
  public address!: Address;

  @OneToMany(() => FranchiseSchedule, (schedule) => schedule.franchise, {
    onDelete: 'CASCADE', nullable: false,
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
  public franchise: Franchise;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  public updatedAt!: Date;

}
