import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 80 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

}
