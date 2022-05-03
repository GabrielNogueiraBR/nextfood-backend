import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { RestaurantCreateDto } from './restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {

  public constructor(
    private readonly restaurantService: RestaurantService,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createRestaurant(@Body() body: RestaurantCreateDto): Promise<void> {
    return this.restaurantService.createRestaurant(body);
  }

}
