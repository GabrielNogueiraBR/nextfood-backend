import { IsBoolean, IsDate, IsString, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  public updatedAt!: Date;

}
