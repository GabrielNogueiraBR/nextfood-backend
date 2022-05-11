import { IsString, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @Column({ type: 'varchar', length: 80 })
  @IsString()
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  @IsString()
  public email: string;

}
