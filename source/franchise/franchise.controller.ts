import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { FranchiseCreateDto, FranchiseDeleteByIdDto, FranchiseDto, FranchiseReadByIdDto, FranchiseReadByRestaurantDto, FranchiseUpdateDto, FranchiseUpdateStatusDto } from './franchise.dto/franchise.dto';
import { FranchiseService } from './franchise.service';

@Controller('franchise')
export class FranchiseController {

  public constructor(
    private readonly franchiseService: FranchiseService,
  ) { }

  @Post()
  public postFranchise(@Body() body: FranchiseCreateDto): Promise<FranchiseDto> {
    return this.franchiseService.createFranchise(body);
  }

  @Get(':id')
  public getFranchiseById(@Param() { id }: FranchiseReadByIdDto): Promise<FranchiseDto> {
    return this.franchiseService.readFranchiseById(id);
  }

  @Get()
  public getFranchiseByRestaurant(@Query() params: FranchiseReadByRestaurantDto): Promise<FranchiseDto[]> {
    if (!params.name && !params.restaurantId) {
      throw new BadRequestException('name or restaurant property must be present');
    }

    return this.franchiseService.readFranchiseByRestaurant(params);
  }

  @Put(':id')
  public updateFranchiseById(
    @Param() { id }: FranchiseReadByIdDto, @Body() body: FranchiseUpdateDto,
  ): Promise<FranchiseDto> {
    return this.franchiseService.updateFranchiseById({ id, ...body });
  }

  @Put(':id/status')
  public updateFranchiseStatusById(
    @Param() { id }: FranchiseReadByIdDto, @Query() query: FranchiseUpdateStatusDto,
  ): Promise<void> {
    return this.franchiseService.updateFranchiseStatusById({ id, ...query });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteFranchiseById(@Param() { id }: FranchiseDeleteByIdDto): Promise<void> {
    return this.franchiseService.deleteFranchiseById(id);
  }

}
