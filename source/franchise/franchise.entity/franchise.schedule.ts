import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { WeekDay } from '../../utils/weekday.enum';
import { Franchise } from './franchise.entity';

@Entity()
export class FranchiseSchedule {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'enum', enum: WeekDay })
  public weekDay: WeekDay;

  @Column({ type: 'varchar' })
  public start_time: string;

  @Column({ type: 'varchar' })
  public end_time: string;

  @OneToOne(() => Franchise, (franchise) => franchise.address, {
    nullable: false, onDelete: 'CASCADE',
  })
  @JoinColumn()
  public franchise!: Franchise;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

}
