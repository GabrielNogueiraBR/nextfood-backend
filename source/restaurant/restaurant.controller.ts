import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { RestaurantCreateDto, RestaurantDeleteByIdDto, RestaurantReadByIdDto, RestaurantUpdateDto } from './restaurant.dto';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {

  public constructor(
    private readonly restaurantService: RestaurantService,
  ) { }

  @ApiOperation({ summary: 'Create a restaurant.' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public postRestaurant(@Body() body: RestaurantCreateDto): Promise<Restaurant> {
    return this.restaurantService.createRestaurant(body);
  }

  @ApiOperation({ summary: 'Read a restaurant by id.' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public getRestaurantById(@Param() params: RestaurantReadByIdDto): Promise<Restaurant> {
    const { id } = params;
    return this.restaurantService.readRestaurantById(id);
  }

  @ApiOperation({ summary: 'Update a restaurant by id.' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public updateRestaurantById(
    @Param() params: RestaurantReadByIdDto, @Body() body: RestaurantUpdateDto,
  ): Promise<Restaurant> {
    return this.restaurantService.updateRestaurantById({ ...params, ...body });
  }

  @ApiOperation({ summary: 'Delete a restaurant by id.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteRestaurantById(@Param() params: RestaurantDeleteByIdDto): Promise<void> {
    return this.restaurantService.deleteRestaurantById(params);
  }

}
