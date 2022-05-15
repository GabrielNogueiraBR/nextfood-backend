import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { RestaurantCreateDto, RestaurantDeleteByIdDto, RestaurantDto, RestaurantReadByIdDto, RestaurantUpdateDto } from './restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {

  public constructor(
    private readonly restaurantService: RestaurantService,
  ) { }

  @Post()
  public postRestaurant(@Body() body: RestaurantCreateDto): Promise<RestaurantDto> {
    return this.restaurantService.createRestaurant(body);
  }

  @Get(':id')
  public getRestaurantById(@Param() { id }: RestaurantReadByIdDto): Promise<RestaurantDto> {
    return this.restaurantService.readRestaurantById(id);
  }

  @Put(':id')
  public updateRestaurantById(
    @Param() params: RestaurantReadByIdDto, @Body() body: RestaurantUpdateDto,
  ): Promise<RestaurantDto> {
    return this.restaurantService.updateRestaurantById({ ...params, ...body });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteRestaurantById(@Param() params: RestaurantDeleteByIdDto): Promise<void> {
    return this.restaurantService.deleteRestaurantById(params);
  }

}
