import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoryCreateDto, CategoryDeleteByIdDto, CategoryReadByIdDto, CategoryUpdateDto } from './category.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {

  public constructor(
    private readonly categoryService: CategoryService,
  ) { }

  @ApiOperation({ summary: 'Create a category.' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public postCategory(@Body() body: CategoryCreateDto): Promise<Category> {
    return this.categoryService.createCategory(body);
  }

  @ApiOperation({ summary: 'Read a category by id.' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public getCategoryById(@Param() { id }: CategoryReadByIdDto): Promise<Category> {
    return this.categoryService.readCategoryById(id);
  }

  @ApiOperation({ summary: 'Update a category by id.' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public updateCategoryById(
    @Param() params: CategoryReadByIdDto, @Body() body: CategoryUpdateDto,
  ): Promise<Category> {
    return this.categoryService.updateCategoryById({ ...params, ...body });
  }

  @ApiOperation({ summary: 'Delete a category by id.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteCategoryById(@Param() params: CategoryDeleteByIdDto): Promise<void> {
    return this.categoryService.deleteCategoryById(params);
  }

}
