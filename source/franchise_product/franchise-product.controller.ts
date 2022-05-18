/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { FranchiseProductCreateDto, FranchiseProductDeleteByIdDto, FranchiseProductDto, FranchiseProductReadByFranchiseDto, FranchiseProductReadByIdDto, FranchiseProductReadByProductDto, FranchiseProductUpdateDto, FranchiseProductUpdateStatusDto } from './franchise-product.dto';
import { FranchiseProductService } from './franchise-product.service';

@Controller('franchise_product')
export class FranchiseProductController {

  public constructor(
    private readonly franchiseProductService: FranchiseProductService,
  ) { }

  @Post()
  public postProduct(@Body() body: FranchiseProductCreateDto): Promise<FranchiseProductDto> {
    return this.franchiseProductService.createProduct(body);
  }

  @Get(':id')
  public getProductById(@Param() { id }: FranchiseProductReadByIdDto): Promise<FranchiseProductDto> {
    return this.franchiseProductService.readFranchiseProductById(id);
  }

  @Get()
  public getFranchiseProductByProduct(@Query() params: FranchiseProductReadByProductDto): Promise<FranchiseProductDto[]> {
    if (!params.productId) {
      throw new BadRequestException('product property must be present');
    }

    return this.franchiseProductService.readFranchiseProductByProduct(params);
  }

  @Get()
  public getFranchiseProductByFranchise(@Query() params: FranchiseProductReadByFranchiseDto): Promise<FranchiseProductDto[]> {
    if (!params.franchiseId) {
      throw new BadRequestException('franchise property must be present');
    }

    return this.franchiseProductService.readFranchiseProductByFranchise(params);
  }

  @Put(':id')
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
