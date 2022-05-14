import { IsBoolean, IsDate, IsObject, IsString, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Address } from '../address/address.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

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

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  public updatedAt!: Date;

}
