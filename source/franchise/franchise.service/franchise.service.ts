import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductService } from '../../product/product.service';
import { RestaurantService } from '../../restaurant/restaurant.service';
import { FranchiseCreateDto, FranchiseDto, FranchiseReadByRestaurantDto as FranchiseReadByRestaurantDto, FranchiseUpdateDto, FranchiseUpdateStatusDto } from '../franchise.dto/franchise.dto';
import { Franchise } from '../franchise.entity/franchise.entity';

@Injectable()
export class FranchiseService {

  public constructor(
    @InjectRepository(Franchise)
    private readonly repository: Repository<Franchise>,
    private readonly productService: ProductService,
    private readonly restaurantService: RestaurantService,
  ) { }

  /**
   * Create a franchise.
   * @param franchiseDto
   */
  public async createFranchise(franchiseDto: FranchiseCreateDto): Promise<FranchiseDto> {
    const { name, restaurantId, address, schedule } = franchiseDto;

    const restaurantEntity = await this.restaurantService.readRestaurantById(restaurantId);
    let franchiseEntity = this.repository.create({
      name,
      address,
      schedule,
      restaurant: restaurantEntity,
    });
    franchiseEntity = await this.repository.save(franchiseEntity);

    return new FranchiseDto(franchiseEntity);
  }

  /**
   * Read a franchise by id.
   * @param id
   */
  public async readFranchiseById(id: string): Promise<FranchiseDto> {
    const franchiseEntity = await this.repository.findOneBy({ id });

    if (!franchiseEntity) throw new NotFoundException('Franchise not found!');

    return new FranchiseDto(franchiseEntity);
  }

  /**
   * Read franchise by restaurant filter params.
   * @param params
   */
  public async readFranchiseByRestaurant(params: FranchiseReadByRestaurantDto): Promise<FranchiseDto[]> {
    const { restaurantId } = params;

    const franchiseEntities = await this.repository.find({
      where: {
        restaurant: {
          id: restaurantId,
        },
      },
    });

    return franchiseEntities.map((franchise) => new FranchiseDto(franchise));
  }

  /**
   * Update a franchise by id.
   * @param params
   */
  public async updateFranchiseById(params: FranchiseUpdateDto): Promise<FranchiseDto> {
    const { id, ...rest } = params;

    const franchiseEntity = await this.repository.findOneBy({ id });

    if (!franchiseEntity) throw new NotFoundException('Restaurant not found!');

    const franchiseUpdated = await this.repository.save({
      ...franchiseEntity,
      ...rest,
    });

    return new FranchiseDto(franchiseUpdated);
  }

  /**
   * Update franchise status.
   * @param params
   */
  public async updateFranchiseStatusById(params: FranchiseUpdateStatusDto): Promise<void> {
    const { id, ...rest } = params;

    await this.readFranchiseById(id);
    await this.repository.update(id, rest);

    return;
  }

  /**
   * Delete a franchise by id.
   * @param id
   */
  public async deleteFranchiseById(id: string): Promise<void> {
    await this.readFranchiseById(id);
    await this.repository.delete(id);

    return;
  }

}