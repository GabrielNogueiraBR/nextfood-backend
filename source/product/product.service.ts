import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryService } from '../category/category.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { ProductCreateDto, ProductDto, ProductReadDto, ProductUpdateDto, ProductUpdateStatusDto } from './product.dto';
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { restaurantId, categoryId, ...rest } = productDto;

    const restaurantEntity = await this.restaurantService.readRestaurantById(restaurantId);
    const categoryEntity = await this.categoryService.readCategoryById(categoryId);

    let productEntity = this.repository.create({
      ...rest,
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
  public async readProducts(params: ProductReadDto): Promise<ProductDto[]> {
    const { restaurantId, categoryId } = params;

    const productEntities = await this.repository.find({
      where: {
        restaurant: {
          id: restaurantId,
        },
        category: {
          id: categoryId,
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
