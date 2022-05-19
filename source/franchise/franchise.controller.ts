import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { FranchiseCreateDto, FranchiseDeleteByIdDto, FranchiseDto, FranchiseReadByIdDto, FranchiseReadByRestaurantDto, FranchiseUpdateDto, FranchiseUpdateStatusDto } from './franchise.dto/franchise.dto';
import { FranchiseProductCreateDto, FranchiseProductDeleteByIdDto, FranchiseProductDto, FranchiseProductReadByIdDto, FranchiseProductReadDto, FranchiseProductUpdateDto, FranchiseProductUpdateStatusDto } from './franchise.dto/franchise.product.dto';
import { FranchiseProductService } from './franchise.service/franchise.product.service';
import { FranchiseService } from './franchise.service/franchise.service';

@Controller('franchise')
export class FranchiseController {

  public constructor(
    private readonly franchiseService: FranchiseService,
    private readonly franchiseProductService: FranchiseProductService,
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

  @Post('product')
  public postFranchiseProduct(@Body() body: FranchiseProductCreateDto): Promise<FranchiseProductDto> {
    return this.franchiseProductService.createFranchiseProduct(body);
  }

  @Get('product')
  public getFranchiseProduct(@Query() query: FranchiseProductReadDto): Promise<FranchiseProductDto[]> {
    return this.franchiseProductService.readFranchiseProduct(query);
  }

  @Put('/product/:id')
  public updateFranchiseProductById(
    @Param() { id }: FranchiseProductReadByIdDto, @Body() body: FranchiseProductUpdateDto,
  ): Promise<FranchiseProductDto> {
    return this.franchiseProductService.updateFranchiseProductById({ id, ...body });
  }

  @Put(':id/status')
  public updateProductStatusById(
    @Param() { id }: FranchiseProductReadByIdDto, @Query() query: FranchiseProductUpdateStatusDto,
  ): Promise<void> {
    return this.franchiseProductService.updateFranchiseProductStatusById({ id, ...query });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteProductById(@Param() { id }: FranchiseProductDeleteByIdDto): Promise<void> {
    return this.franchiseProductService.deleteFranchiseProductById(id);
  }

}
