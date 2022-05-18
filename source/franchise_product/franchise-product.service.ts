/* eslint-disable max-len */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FranchiseService } from '../franchise/franchise.service';
import { ProductService } from '../product/product.service';
import { FranchiseProductCreateDto, FranchiseProductDto, FranchiseProductReadByFranchiseDto, FranchiseProductReadByProductDto, FranchiseProductUpdateDto, FranchiseProductUpdateStatusDto } from './franchise-product.dto';
import { FranchiseProduct } from './franchise-product.entity';

@Injectable()
export class FranchiseProductService {

  public constructor(
    @InjectRepository(FranchiseProduct)
    private readonly repository: Repository<FranchiseProduct>,
    private readonly productService: ProductService,
    private readonly franchiseService: FranchiseService,

  ) { }

  /**
   * Create a product.
   * @param franchiseProductDto
   */
  public async createProduct(franchiseProductDto: FranchiseProductCreateDto): Promise<FranchiseProductDto> {
    const { price, productId, franchiseId } = franchiseProductDto;

    const productEntity = await this.productService.readProductById(productId);
    const franchiseEntity = await this.franchiseService.readFranchiseById(franchiseId);

    let franchiseProductEntity = this.repository.create({
      price,
      product: productEntity,
      franchise: franchiseEntity,
    });
    franchiseProductEntity = await this.repository.save(franchiseProductEntity);

    return new FranchiseProductDto(franchiseProductEntity);
  }

  /**
   * Read a product by id.
   * @param id
   */
  public async readFranchiseProductById(id: string): Promise<FranchiseProductDto> {
    const franchiseProductEntity = await this.repository.findOneBy({ id });

    if (!franchiseProductEntity) throw new NotFoundException('product not found!');

    return new FranchiseProductDto(franchiseProductEntity);
  }

  /**
   * Read product by restaurant filter params.
   * @param params
   */
  public async readFranchiseProductByProduct(params: FranchiseProductReadByProductDto): Promise<FranchiseProductDto[]> {
    const { productId } = params;

    const franchiseProductEntities = await this.repository.find({
      where: {
        product: {
          id: productId,
        },
      },
    });

    return franchiseProductEntities.map((franchiseProduct) => new FranchiseProductDto(franchiseProduct));
  }

  /**
   * Read product by category filter params.
   * @param params
   */
  public async readFranchiseProductByFranchise(params: FranchiseProductReadByFranchiseDto): Promise<FranchiseProductDto[]> {
    const { franchiseId } = params;

    const franchiseProductEntities = await this.repository.find({
      where: {
        franchise: {
          id: franchiseId,
        },
      },
    });

    return franchiseProductEntities.map((franchiseProduct) => new FranchiseProductDto(franchiseProduct));
  }

  /**
   * Update a product by id.
   * @param params
   */
  public async updateFranchiseProductById(params: FranchiseProductUpdateDto): Promise<FranchiseProductDto> {
    const { id, ...rest } = params;

    const franchiseProductEntity = await this.repository.findOneBy({ id });

    if (!franchiseProductEntity) throw new NotFoundException('product not found!');

    const franchiseProductUpdated = await this.repository.save({
      ...franchiseProductEntity,
      ...rest,
    });

    return new FranchiseProductDto(franchiseProductUpdated);
  }

  /**
   * Update product status (active or not).
   * @param params
   */
  public async updateFranchiseProductStatusById(params: FranchiseProductUpdateStatusDto): Promise<void> {
    const { id, ...rest } = params;

    await this.readFranchiseProductById(id);
    await this.repository.update(id, rest);

    return;
  }

  /**
   * Delete a product by id.
   * @param id
   */
  public async deleteFranchiseProductById(id: string): Promise<void> {
    await this.readFranchiseProductById(id);
    await this.repository.delete(id);

    return;
  }

}
