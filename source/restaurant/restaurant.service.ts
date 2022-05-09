import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RestaurantCreateDto, RestaurantDeleteByIdDto, RestaurantUpdateDto } from './restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {

  public constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<Restaurant>,
  ) { }

  /**
   * Create a restaurant.
   * @param restaurant
   */
  public async createRestaurant(restaurant: RestaurantCreateDto): Promise<Restaurant> {
    const { name, description } = restaurant;

    const restaurantEntity = this.repository.create({
      name,
      description,
    });

    return this.repository.save(restaurantEntity);
  }

  /**
   * Read restaurant by id.
   * @param id
   */
  public async readRestaurantById(id: string): Promise<Restaurant> {
    const restaurant = await this.repository.findOneBy({ id });

    if (!restaurant) throw new BadRequestException('Restaurant not found!');

    return restaurant;
  }

  /**
   * Update restaurant name or description by id.
   * @param params
   */
  public async updateRestaurantById(params: RestaurantUpdateDto): Promise<Restaurant> {
    const { id, ...rest } = params;

    const restaurant = await this.readRestaurantById(id);

    return this.repository.save({
      ...restaurant,
      ...rest,
    });
  }

  /**
   * Delete restaurant by id.
   * @param params
   */
  public async deleteRestaurantById(params: RestaurantDeleteByIdDto): Promise<void> {
    const { id } = params;

    await this.readRestaurantById(id);
    await this.repository.delete(id);

    return;
  }

}
