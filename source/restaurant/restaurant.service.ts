import { Inject, Injectable } from '@nestjs/common';
import * as faunadb from 'faunadb';

import configuration from '../config/env-vars';
import { FaunadbRecordBaseFields } from '../faunadb/faunadb.types';
import { RestaurantCreateDto, RestaurantReadByIdDto } from './restaurant.dto';
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
   * Read restaurant by (fauna) id.
   * @param params
   */
  public async readRestaurantById(params: RestaurantReadByIdDto): Promise<Restaurant> {
    const { id: restaurantId } = params;

    const { data, ref } = await this.clientDb.query(
      this.faunadbQuery.Get(
        this.faunadbQuery.Ref(this.faunadbQuery.Collection(this.faunaCollection), restaurantId),
      ),
    ) as any as FaunadbRecordBaseFields<Restaurant>;

    return {
      id: ref.id,
      ...data,
    };
  }

}
