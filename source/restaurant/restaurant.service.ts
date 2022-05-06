import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as faunadb from 'faunadb';
import { Select } from 'faunadb';

import configuration from '../config/env-vars';
import { FaunadbRecordBaseFields } from '../faunadb/faunadb.types';
import { RestaurantCategoryCreateDto, RestaurantCategoryDeleteDto, RestaurantCreateDto, RestaurantDeleteByIdDto, RestaurantUpdateDto } from './restaurant.dto';
import { Restaurant, RestaurantCategory } from './restaurant.entity';

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

    try {
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
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Read restaurant by id.
   * @param restaurantId
   */
  public async readRestaurantById(restaurantId: string): Promise<Restaurant> {
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

  /**
   * Create restaurant category and insert them.
   * @param params
   */
  public async createRestaurantCategory(params: RestaurantCategoryCreateDto): Promise<Restaurant> {
    const { restaurantId, name: categoryName, icon } = params;
    const categoryEntity = new RestaurantCategory({ name: categoryName, icon });

    try {
      const { categories } = await this.readRestaurantById(restaurantId);
      const hasCategory = categories.find((category) => category.name === categoryName);

      if (hasCategory) {
        throw new BadRequestException('Category already exists for this restaurant');
      }

      const { data, ref } = await this.clientDb.query(
        this.faunadbQuery.Let(
          {
            ref: this.faunadbQuery.Ref(this.faunadbQuery.Collection(this.faunaCollection), restaurantId),
            doc: this.faunadbQuery.Get(this.faunadbQuery.Var('ref')),
            categories: this.faunadbQuery.Select([ 'data', 'categories' ], this.faunadbQuery.Var('doc')),
          },
          this.faunadbQuery.Update(
            this.faunadbQuery.Var('ref'),
            {
              data: {
                categories: this.faunadbQuery.Append(
                  {
                    ...categoryEntity,
                  },
                  this.faunadbQuery.Var('categories'),
                ),
              },
            },
          ),
        ),
      ) as any as FaunadbRecordBaseFields<Restaurant>;

      return {
        id: ref.id,
        ...data,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Delete restaurant category.
   * @param params
   */
  public async deleteRestaurantCategory(params: RestaurantCategoryDeleteDto): Promise<void> {
    const { restaurantId, categoryId } = params;

    try {
      const { categories } = await this.readRestaurantById(restaurantId);
      const hasCategory = categories.find((category) => category.id === categoryId);

      if (!hasCategory) {
        throw new NotFoundException('Category not found.');
      }

      await this.clientDb.query(
        this.faunadbQuery.Let(
          {
            ref: this.faunadbQuery.Ref(this.faunadbQuery.Collection(this.faunaCollection), restaurantId),
            categories: Select(
              [ 'data', 'categories' ],
              this.faunadbQuery.Get(this.faunadbQuery.Var('ref')),
              false,
            ),
            new_categories: this.faunadbQuery.Filter(
              this.faunadbQuery.Var('categories'),
              this.faunadbQuery.Lambda(
                'category',
                this.faunadbQuery.Not(
                  this.faunadbQuery.Equals(
                    this.faunadbQuery.Select('id', this.faunadbQuery.Var('category')),
                    categoryId,
                  ),
                ),
              ),
            ),
          },
          this.faunadbQuery.Update(
            this.faunadbQuery.Var('ref'),
            {
              data: {
                categories: this.faunadbQuery.Var('new_categories'),
              },
            },
          ),
        ),
      );

      return;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

}
