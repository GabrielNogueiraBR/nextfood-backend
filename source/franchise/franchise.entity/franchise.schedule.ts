import { IsDate, IsIn, IsObject, IsString, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { WeekDay } from '../../utils/weekday.enum';
import { Franchise } from './franchise.entity';

@Entity()
export class FranchiseSchedule {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @Column({ type: 'enum', enum: WeekDay })
  @IsIn(Object.values(WeekDay))
  public weekDay: WeekDay;

  @Column({ type: 'varchar' })
  @IsString()
  public start_time: string;

  @Column({ type: 'varchar' })
  @IsString()
  public end_time: string;

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
