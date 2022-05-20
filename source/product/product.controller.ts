/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { ProductCreateDto, ProductDeleteByIdDto, ProductDto, ProductReadByIdDto, ProductReadDto, ProductUpdateDto } from './product.dto';
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
  public getProducts(@Query() params: ProductReadDto): Promise<ProductDto[]> {
    return this.productService.readProducts(params);
  }

  @Put(':id')
  public updateProductById(
    @Param() { id }: ProductReadByIdDto, @Body() body: ProductUpdateDto,
  ): Promise<ProductDto> {
    return this.productService.updateProductById({ id, ...body });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteProductById(@Param() { id }: ProductDeleteByIdDto): Promise<void> {
    return this.productService.deleteProductById(id);
  }

}
