import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { CategoryCreateDto, CategoryDeleteByIdDto, CategoryReadByIdDto, CategoryUpdateDto } from './category.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

  public constructor(
    private readonly categoryService: CategoryService,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public postCategory(@Body() body: CategoryCreateDto): Promise<Category> {
    return this.categoryService.createCategory(body);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public getCategoryById(@Param() { id }: CategoryReadByIdDto): Promise<Category> {
    return this.categoryService.readCategoryById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public updateCategoryById(
    @Param() params: CategoryReadByIdDto, @Body() body: CategoryUpdateDto,
  ): Promise<Category> {
    return this.categoryService.updateCategoryById({ ...params, ...body });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteCategoryById(@Param() params: CategoryDeleteByIdDto): Promise<void> {
    return this.categoryService.deleteCategoryById(params);
  }

}
