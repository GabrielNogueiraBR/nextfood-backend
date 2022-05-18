import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryCreateDto, CategoryDeleteByIdDto, CategoryDto, CategoryUpdateDto } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {

  public constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) { }

  /**
   * Create a category.
   * @param categoryDto
   */
  public async createCategory(categoryDto: CategoryCreateDto): Promise<CategoryDto> {
    let categoryEntity = this.repository.create(categoryDto);
    categoryEntity = await this.repository.save(categoryEntity);

    return new CategoryDto(categoryEntity);
  }

  /**
   * Read category by id.
   * @param id
   */
  public async readCategoryById(id: string): Promise<CategoryDto> {
    const categoryEntity = await this.repository.findOneBy({ id });

    if (!categoryEntity) throw new NotFoundException('Category not found!');

    return new CategoryDto(categoryEntity);
  }

  /**
   * Update category by id.
   * @param params
   */
  public async updateCategoryById(params: CategoryUpdateDto): Promise<CategoryDto> {
    const { id, ...rest } = params;

    let categoryEntity = await this.repository.findOneBy({ id });

    if (!categoryEntity) throw new NotFoundException('Category not found!');

    categoryEntity = await this.repository.save({
      ...categoryEntity,
      ...rest,
    });

    return new CategoryDto(categoryEntity);
  }

  /**
   * Delete category by id.
   * @param params
   */
  public async deleteCategoryById(params: CategoryDeleteByIdDto): Promise<void> {
    const { id } = params;

    await this.readCategoryById(id);
    await this.repository.delete(id);

    return;
  }

}
