import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { RestaurantCreateDto, RestaurantReadByIdDto } from './restaurant.dto';
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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public getRestaurantById(@Param() params: RestaurantReadByIdDto): Promise<Restaurant> {
    return this.restaurantService.readRestaurantById(params);
  }

}
