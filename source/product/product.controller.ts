/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductCreateDto, ProductDeleteByIdDto, ProductDto, ProductReadByIdDto, ProductReadDto, ProductUpdateDto } from './product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {

  public constructor(
    private readonly productService: ProductService,
  ) { }

  @ApiOperation({ summary: 'Create a product.' })
  @ApiResponse({ status: 201, type: ProductDto })
  @Post()
  public postProduct(@Body() body: ProductCreateDto): Promise<ProductDto> {
    return this.productService.createProduct(body);
  }

  @ApiOperation({ summary: 'Read a product by id.' })
  @ApiResponse({ status: 201, type: ProductDto })
  @Get(':id')
  public getProductById(@Param() { id }: ProductReadByIdDto): Promise<ProductDto> {
    return this.productService.readProductById(id);
  }

  @ApiOperation({ summary: 'Read product by filter params.' })
  @ApiResponse({ status: 201, type: ProductDto, isArray: true })
  @Get()
  public getProducts(@Query() params: ProductReadDto): Promise<ProductDto[]> {
    return this.productService.readProducts(params);
  }

  @ApiOperation({ summary: 'Update a product.' })
  @ApiResponse({ status: 201, type: ProductDto })
  @Put(':id')
  public updateProductById(
    @Param() { id }: ProductReadByIdDto, @Body() body: ProductUpdateDto,
  ): Promise<ProductDto> {
    return this.productService.updateProductById({ id, ...body });
  }

  @ApiOperation({ summary: 'Delete a product.' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteProductById(@Param() { id }: ProductDeleteByIdDto): Promise<void> {
    return this.productService.deleteProductById(id);
  }

}
