import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { RestaurantCreateDto } from './restaurant.dto';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {

  public constructor(
    private readonly restaurantService: RestaurantService,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public postRestaurant(@Body() body: RestaurantCreateDto): Promise<Restaurant> {
    return this.restaurantService.createRestaurant(body);
  }

}
