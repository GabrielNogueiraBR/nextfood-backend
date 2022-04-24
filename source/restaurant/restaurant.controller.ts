import { Body, Controller, Post } from '@nestjs/common';

import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {

  public constructor(
    private readonly restaurantService: RestaurantService,
  ) { }

  @Post()
  public async createRestaurant(@Body() body: any): Promise<any> {
    return this.restaurantService.createRestaurant(body);
  }

}
