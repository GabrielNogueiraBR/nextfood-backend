import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RestaurantCreateDto, RestaurantDto, RestaurantUpdateDto } from './restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {

  public constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<Restaurant>,
  ) { }

  /**
   * Create a restaurant.
   * @param restaurantDto
   */
  public async createRestaurant(restaurantDto: RestaurantCreateDto): Promise<RestaurantDto> {
    const { name, description } = restaurantDto;

    let restaurantEntity = this.repository.create({
      name,
      description,
    });
    restaurantEntity = await this.repository.save(restaurantEntity);

    return new RestaurantDto(restaurantEntity);
  }

  /**
   * Read restaurant by id.
   * @param id
   */
  public async readRestaurantById(id: string): Promise<RestaurantDto> {
    const restaurantEntity = await this.repository.findOneBy({ id });

    if (!restaurantEntity) throw new NotFoundException('Restaurant not found!');

    return new RestaurantDto(restaurantEntity);
  }

  /**
   * Update restaurant by id.
   * @param restaurantDto
   */
  public async updateRestaurantById(restaurantDto: RestaurantUpdateDto): Promise<RestaurantDto> {
    const { id, ...rest } = restaurantDto;

    const restaurantEntity = await this.repository.findOneBy({ id });

    if (!restaurantEntity) throw new NotFoundException('Restaurant not found!');

    const restaurantUpdated = await this.repository.save({
      ...restaurantEntity,
      ...rest,
    });

    return new RestaurantDto(restaurantUpdated);
  }

  /**
   * Delete restaurant by id.
   * @param id
   */
  public async deleteRestaurantById(id: string): Promise<void> {
    await this.readRestaurantById(id);
    await this.repository.delete(id);

    return;
  }

}
