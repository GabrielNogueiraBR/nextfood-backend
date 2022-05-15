import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { FranchiseCreateDto, FranchiseDto, FranchiseReadById, FranchiseReadByRestaurant } from './franchise.dto/franchise.dto';
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
  public getFranchiseById(@Param() { id }: FranchiseReadById): Promise<FranchiseDto> {
    return this.franchiseService.readFranchiseById(id);
  }

  @Get()
  public getFranchiseByRestaurant(@Query() params: FranchiseReadByRestaurant): Promise<FranchiseDto[]> {
    if (!params.name && !params.restaurantId) {
      throw new BadRequestException('name or restaurant property must be present');
    }

    return this.franchiseService.readFranchiseByRestaurant(params);
  }

}
