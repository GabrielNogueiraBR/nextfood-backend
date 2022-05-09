import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { RestaurantCreateDto, RestaurantDeleteByIdDto, RestaurantReadByIdDto, RestaurantUpdateDto } from './restaurant.dto';
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
  public getRestaurantById(@Param() { id }: RestaurantReadByIdDto): Promise<Restaurant> {
    return this.restaurantService.readRestaurantById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public updateRestaurantById(
    @Param() params: RestaurantReadByIdDto, @Body() body: RestaurantUpdateDto,
  ): Promise<Restaurant> {
    return this.restaurantService.updateRestaurantById({ ...params, ...body });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteRestaurantById(@Param() params: RestaurantDeleteByIdDto): Promise<void> {
    return this.restaurantService.deleteRestaurantById(params);
  }

}
