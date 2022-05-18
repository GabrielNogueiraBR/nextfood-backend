/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { ProductCreateDto, ProductDeleteByIdDto, ProductDto, ProductReadByCategoryDto, ProductReadByIdDto, ProductReadByRestaurantDto, ProductUpdateDto, ProductUpdateStatusDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

  public constructor(
    private readonly productService: ProductService,
  ) { }

  @Post()
  public postProduct(@Body() body: ProductCreateDto): Promise<ProductDto> {
    return this.productService.createProduct(body);
  }

  @Get(':id')
  public getProductById(@Param() { id }: ProductReadByIdDto): Promise<ProductDto> {
    return this.productService.readProductById(id);
  }

  @Get()
  public getProductByRestaurant(@Query() params: ProductReadByRestaurantDto): Promise<ProductDto[]> {
    if (!params.name && !params.restaurantId) {
      throw new BadRequestException('name or restaurant property must be present');
    }

    return this.productService.readProductByRestaurant(params);
  }

  @Get()
  public getProductByCategory(@Query() params: ProductReadByCategoryDto): Promise<ProductDto[]> {
    if (!params.name && !params.categoryId) {
      throw new BadRequestException('name or category property must be present');
    }

    return this.productService.readProductByCategory(params);
  }

  @Put(':id')
  public updateProductById(
    @Param() { id }: ProductReadByIdDto, @Body() body: ProductUpdateDto,
  ): Promise<ProductDto> {
    return this.productService.updateProductById({ id, ...body });
  }

  @Put(':id/status')
  public updateProductStatusById(
    @Param() { id }: ProductReadByIdDto, @Query() query: ProductUpdateStatusDto,
  ): Promise<void> {
    return this.productService.updateProductStatusById({ id, ...query });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteProductById(@Param() { id }: ProductDeleteByIdDto): Promise<void> {
    return this.productService.deleteProductById(id);
  }

}
