import { Inject, Injectable } from '@nestjs/common';
import * as faunadb from 'faunadb';

import configuration, { EnvVarsDatabase } from '../config/env-vars';
import { RestaurantCreateDto } from './restaurant.dto';

@Injectable()
export class RestaurantService {

  private faunadbQuery = faunadb.query;
  private faunaCredentials: EnvVarsDatabase;

  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly clientDb: faunadb.Client,
  ) {
    this.faunaCredentials = configuration().database;
  }

  /**
   * Create a restaurant.
   * @param params
   */
  public async createRestaurant(params: RestaurantCreateDto): Promise<void> {
    await this.clientDb.query(
      this.faunadbQuery.Create(
        this.faunadbQuery.Collection(this.faunaCredentials.restaurant_collection),
        {
          data: params,
        },
      ),
    );
  }

}
