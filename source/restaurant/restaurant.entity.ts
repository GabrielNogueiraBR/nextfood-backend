import { IsBoolean, IsDate, IsString, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { RestaurantCategoryCreateDto } from './restaurant.dto';

export class RestaurantCategory {

  @IsUUID()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  public icon: string;

  @IsBoolean()
  public isActive: boolean;

  public constructor({ name, icon }: Omit<RestaurantCategoryCreateDto, 'restaurantId'>) {
    this.id = uuidv4();
    this.name = name;
    this.icon = icon;
    this.isActive = true;
  }

}

@Entity()
export class Restaurant {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  @IsString()
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  @IsString()
  public description: string;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  public isActive: boolean;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => RestaurantCategory)
  // public categories: RestaurantCategory[];

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  public updatedAt!: Date;

}
