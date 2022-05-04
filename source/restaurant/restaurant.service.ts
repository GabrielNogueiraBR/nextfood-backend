import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as faunadb from 'faunadb';

import configuration from '../config/env-vars';
import { FaunadbRecordBaseFields } from '../faunadb/faunadb.types';
import { RestaurantCreateDto, RestaurantDeleteByIdDto, RestaurantReadByIdDto, RestaurantUpdateDto } from './restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {

  private faunadbQuery = faunadb.query;
  private faunaCollection: string;

  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly clientDb: faunadb.Client,
  ) {
    const faunaEnvVars = configuration().database;
    this.faunaCollection = faunaEnvVars.restaurant_collection;
  }

  /**
   * Create a restaurant.
   * @param params
   */
  public async createRestaurant(params: RestaurantCreateDto): Promise<Restaurant> {
    const restaurantEntity = new Restaurant(params);

    const { data, ref } = await this.clientDb.query(
      this.faunadbQuery.Create(
        this.faunadbQuery.Collection(this.faunaCollection),
        { data: restaurantEntity },
      ),
    ) as any as FaunadbRecordBaseFields<Restaurant>;

    return {
      id: ref.id,
      ...data,
    };
  }

  /**
   * Read restaurant by id.
   * @param params
   */
  public async readRestaurantById(params: RestaurantReadByIdDto): Promise<Restaurant> {
    const { id: restaurantId } = params;

    try {
      const { data, ref } = await this.clientDb.query(
        this.faunadbQuery.Get(
          this.faunadbQuery.Ref(this.faunadbQuery.Collection(this.faunaCollection), restaurantId),
        ),
      ) as any as FaunadbRecordBaseFields<Restaurant>;

      return {
        id: ref.id,
        ...data,
      };
    } catch (e) {
      if (e.requestResult.statusCode === 404) {
        throw new NotFoundException('Restaurant not found');
      }

      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Update restaurant name or description by id.
   * @param params
   */
  public async updateRestaurantById(params: RestaurantUpdateDto): Promise<Restaurant> {
    const { id: restaurantId, ...rest } = params;

    try {
      const { data, ref } = await this.clientDb.query(
        this.faunadbQuery.Update(
          this.faunadbQuery.Ref(this.faunadbQuery.Collection(this.faunaCollection), restaurantId),
          { data: rest },
        ),
      ) as any as FaunadbRecordBaseFields<Restaurant>;

      return {
        id: ref.id,
        ...data,
      };
    } catch (e) {
      if (e.requestResult.statusCode === 404) {
        throw new NotFoundException('Restaurant not found');
      }

      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Delete restaurant by id.
   * @param params
   */
  public async deleteRestaurantById(params: RestaurantDeleteByIdDto): Promise<void> {
    const { id: restaurantId } = params;

    try {
      await this.clientDb.query(
        this.faunadbQuery.Delete(
          this.faunadbQuery.Ref(this.faunadbQuery.Collection(this.faunaCollection), restaurantId),
        ),
      );

      return;
    } catch (e) {
      if (e.requestResult.statusCode === 404) {
        throw new NotFoundException('Restaurant not found');
      }

      throw new InternalServerErrorException(e);
    }
  }

}
