import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FranchiseCreateDto, FranchiseDeleteByIdDto, FranchiseDto, FranchiseReadByIdDto, FranchiseReadByRestaurantDto, FranchiseUpdateDto, FranchiseUpdateStatusDto } from './franchise.dto/franchise.dto';
import { FranchiseService } from './franchise.service';
@ApiTags('Franchise')
@Controller('franchise')
export class FranchiseController {

  public constructor(
    private readonly franchiseService: FranchiseService,
  ) { }

  @ApiOperation({ summary: 'Create a franchise.' })
  @ApiResponse({ status: 201, type: FranchiseDto })
  @Post()
  public postFranchise(@Body() body: FranchiseCreateDto): Promise<FranchiseDto> {
    return this.franchiseService.createFranchise(body);
  }

  @ApiOperation({ summary: 'Read a franchise by id.' })
  @ApiResponse({ status: 200, type: FranchiseDto })
  @Get(':id')
  public getFranchiseById(@Param() { id }: FranchiseReadByIdDto): Promise<FranchiseDto> {
    return this.franchiseService.readFranchiseById(id);
  }

  @ApiOperation({ summary: 'Read a franchise by restaurant filter params.' })
  @ApiResponse({ status: 200, type: [ FranchiseDto ] })
  @Get()
  public getFranchiseByRestaurant(@Query() params: FranchiseReadByRestaurantDto): Promise<FranchiseDto[]> {
    if (!params.name && !params.restaurantId) {
      throw new BadRequestException('name or restaurant property must be present');
    }

    return this.franchiseService.readFranchiseByRestaurant(params);
  }

  @ApiOperation({ summary: 'Update a franchise by id.' })
  @ApiResponse({ status: 200, type: FranchiseDto })
  @Put(':id')
  public updateFranchiseById(
    @Param() { id }: FranchiseReadByIdDto, @Body() body: FranchiseUpdateDto,
  ): Promise<FranchiseDto> {
    return this.franchiseService.updateFranchiseById({ id, ...body });
  }

  @ApiOperation({ summary: 'Update a franchise status by id.' })
  @ApiResponse({ status: 200 })
  @Put(':id/status')
  public updateFranchiseStatusById(
    @Param() { id }: FranchiseReadByIdDto, @Query() query: FranchiseUpdateStatusDto,
  ): Promise<void> {
    return this.franchiseService.updateFranchiseStatusById({ id, ...query });
  }

  @ApiOperation({ summary: 'Delete a franchise by id.' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteFranchiseById(@Param() { id }: FranchiseDeleteByIdDto): Promise<void> {
    return this.franchiseService.deleteFranchiseById(id);
  }

}
