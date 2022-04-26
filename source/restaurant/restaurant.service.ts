import { Inject, Injectable } from '@nestjs/common';
import * as faunadb from 'faunadb';

@Injectable()
export class RestaurantService {

  private faunadbQuery = faunadb.query;

  public constructor(
    @Inject('DATABASE_CONNECTION') private readonly clientDb: faunadb.Client,
  ) { }

  /**
   * Create a restaurant.
   * @param params
   */
  public async createRestaurant(params: any): Promise<any> {
    return this.clientDb.query(
      this.faunadbQuery.Create(
        this.faunadbQuery.Collection('test'),
        {
          data: params,
        },
      ),
    );
  }

}
