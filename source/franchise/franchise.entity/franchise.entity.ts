/* eslint-disable @typescript-eslint/naming-convention */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Address } from '../../address/address.entity';
import { Employee } from '../../employee/employee.entity';
import { Restaurant } from '../../restaurant/restaurant.entity';
import { FranchiseProduct } from './franchise.product.entity';
import { FranchiseSchedule } from './franchise.schedule';

@Entity()
export class Franchise {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'boolean', default: true })
  public isActive: boolean = true;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.franchises, {
    onDelete: 'CASCADE', nullable: false,
  })
  public restaurant!: Restaurant;

  @OneToOne(() => Address, (address) => address.franchise, {
    cascade: true, eager: true, nullable: false,
  })
  @JoinColumn()
  public address!: Address;

  @OneToMany(() => Employee, (employee) => employee.franchise)
  public employees: Employee[];

  @OneToMany(() => FranchiseSchedule, (schedule) => schedule.franchise, {
    cascade: true, eager: true, nullable: false,
  })
  public schedule!: FranchiseSchedule[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @OneToMany(() => FranchiseProduct, (franchise_product) => franchise_product.franchise)
  public fr_franchise: FranchiseProduct[];

}

