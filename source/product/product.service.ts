import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryService } from '../category/category.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { ProductCreateDto, ProductDto, ProductReadByCategoryDto, ProductReadByRestaurantDto, ProductUpdateDto, ProductUpdateStatusDto } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {

  public constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private readonly restaurantService: RestaurantService,
    private readonly categoryService: CategoryService,

  ) { }

  /**
   * Create a product.
   * @param productDto
   */
  public async createProduct(productDto: ProductCreateDto): Promise<ProductDto> {
    const { name, description, ingredients, amountP, restaurantId, categoryId } = productDto;

    const restaurantEntity = await this.restaurantService.readRestaurantById(restaurantId);
    const categoryEntity = await this.categoryService.readCategoryById(categoryId);

    let productEntity = this.repository.create({
      name,
      description,
      ingredients,
      amountP,
      restaurant: restaurantEntity,
      category: categoryEntity,
    });
    productEntity = await this.repository.save(productEntity);

    return new ProductDto(productEntity);
  }

  /**
   * Read a product by id.
   * @param id
   */
  public async readProductById(id: string): Promise<ProductDto> {
    const productEntity = await this.repository.findOneBy({ id });

    if (!productEntity) throw new NotFoundException('product not found!');

    return new ProductDto(productEntity);
  }

  /**
   * Read product by restaurant filter params.
   * @param params
   */
  public async readProductByRestaurant(params: ProductReadByRestaurantDto): Promise<ProductDto[]> {
    const { restaurantId, name } = params;

    const productEntities = await this.repository.find({
      where: {
        restaurant: {
          id: restaurantId,
          name,
        },
      },
    });

    return productEntities.map((product) => new ProductDto(product));
  }

  /**
   * Read product by category filter params.
   * @param params
   */
  public async readProductByCategory(params: ProductReadByCategoryDto): Promise<ProductDto[]> {
    const { categoryId, name } = params;

    const productEntities = await this.repository.find({
      where: {
        category: {
          id: categoryId,
          name,
        },
      },
    });

    return productEntities.map((product) => new ProductDto(product));
  }

  /**
   * Update a product by id.
   * @param params
   */
  public async updateProductById(params: ProductUpdateDto): Promise<ProductDto> {
    const { id, ...rest } = params;

    const productEntity = await this.repository.findOneBy({ id });

    if (!productEntity) throw new NotFoundException('product not found!');

    const productUpdated = await this.repository.save({
      ...productEntity,
      ...rest,
    });

    return new ProductDto(productUpdated);
  }

  /**
   * Update product status (active or not).
   * @param params
   */
  public async updateProductStatusById(params: ProductUpdateStatusDto): Promise<void> {
    const { id, ...rest } = params;

    await this.readProductById(id);
    await this.repository.update(id, rest);

    return;
  }

  /**
   * Delete a product by id.
   * @param id
   */
  public async deleteProductById(id: string): Promise<void> {
    await this.readProductById(id);
    await this.repository.delete(id);

    return;
  }

}
