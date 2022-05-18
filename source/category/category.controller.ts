import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoryCreateDto, CategoryDeleteByIdDto, CategoryDto, CategoryIdDto, CategoryReadByIdDto, CategoryUpdateDto } from './category.dto';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {

  public constructor(
    private readonly categoryService: CategoryService,
  ) { }

  @ApiOperation({ summary: 'Create a category.' })
  @Post()
  public postCategory(@Body() body: CategoryCreateDto): Promise<CategoryDto> {
    return this.categoryService.createCategory(body);
  }

  @ApiOperation({ summary: 'Read category list.' })
  @Get()
  public getCategoryList(): Promise<CategoryDto[]> {
    return this.categoryService.readCategoryList();
  }

  @ApiOperation({ summary: 'Read a category by id.' })
  @Get(':id')
  public getCategoryById(@Param() { id }: CategoryReadByIdDto): Promise<CategoryDto> {
    return this.categoryService.readCategoryById(id);
  }

  @ApiOperation({ summary: 'Update a category by id.' })
  @Put(':id')
  public updateCategoryById(
    @Param() params: CategoryIdDto, @Body() body: CategoryUpdateDto,
  ): Promise<CategoryDto> {
    return this.categoryService.updateCategoryById({ ...params, ...body });
  }

  @ApiOperation({ summary: 'Delete a category by id.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteCategoryById(@Param() params: CategoryDeleteByIdDto): Promise<void> {
    return this.categoryService.deleteCategoryById(params);
  }

}
