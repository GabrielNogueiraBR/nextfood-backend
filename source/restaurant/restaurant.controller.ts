import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RestaurantCreateDto, RestaurantDeleteByIdDto, RestaurantDto, RestaurantIdDto, RestaurantReadByIdDto, RestaurantUpdateDto } from './restaurant.dto';
import { RestaurantService } from './restaurant.service';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {

  public constructor(
    private readonly restaurantService: RestaurantService,
  ) { }

  @ApiOperation({ summary: 'Create a restaurant.' })
  @ApiResponse({ status: 201, type: RestaurantDto })
  @Post()
  public postRestaurant(@Body() body: RestaurantCreateDto): Promise<RestaurantDto> {
    return this.restaurantService.createRestaurant(body);
  }

  @ApiOperation({ summary: 'Read a restaurant by id.' })
  @ApiResponse({ status: 200, type: RestaurantDto })
  @Get(':id')
  public getRestaurantById(@Param() { id }: RestaurantReadByIdDto): Promise<RestaurantDto> {
    return this.restaurantService.readRestaurantById(id);
  }

  @ApiOperation({ summary: 'Update a restaurant by id.' })
  @ApiResponse({ status: 200, type: RestaurantDto })
  @Put(':id')
  public updateRestaurantById(
    @Param() { id }: RestaurantIdDto, @Body() body: RestaurantUpdateDto,
  ): Promise<RestaurantDto> {
    return this.restaurantService.updateRestaurantById({ id, ...body });
  }

  @ApiOperation({ summary: 'Delete a restaurant by id.' })
  @ApiResponse({ status: 204 })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public deleteRestaurantById(@Param() { id }: RestaurantDeleteByIdDto): Promise<void> {
    return this.restaurantService.deleteRestaurantById(id);
  }

}
