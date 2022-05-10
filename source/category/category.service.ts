import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryCreateDto, CategoryDeleteByIdDto, CategoryUpdateDto } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {

  public constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) { }

  /**
   * Create a category.
   * @param category
   */
  public async createCategory(category: CategoryCreateDto): Promise<Category> {
    const { name, icon } = category;

    const categoryEntity = this.repository.create({
      name,
      icon,
    });

    return this.repository.save(categoryEntity);
  }

  /**
   * Read category by id.
   * @param id
   */
  public async readCategoryById(id: string): Promise<Category> {
    const category = await this.repository.findOneBy({ id });

    if (!category) throw new NotFoundException('Category not found!');

    return category;
  }

  /**
   * Update category by id.
   * @param params
   */
  public async updateCategoryById(params: CategoryUpdateDto): Promise<Category> {
    const { id, ...rest } = params;

    const category = await this.readCategoryById(id);

    return this.repository.save({
      ...category,
      ...rest,
    });
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
