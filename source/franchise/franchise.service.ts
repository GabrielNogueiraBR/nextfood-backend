import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddressService } from './../address/address.service';
import { RestaurantService } from './../restaurant/restaurant.service';
import { FranchiseCreateDto } from './franchise.dto';
import { Franchise } from './franchise.entity';

@Injectable()
export class FranchiseService {

  public constructor(
    @InjectRepository(Franchise)
    private readonly repository: Repository<Franchise>,
    private readonly addressService: AddressService,
    private readonly restaurantService: RestaurantService,
  ) { }

  /**
   * Create a franchise.
   * @param franchiseDto
   */
  public async createFranchise(franchiseDto: FranchiseCreateDto): Promise<Franchise> {
    const { name, restaurantId, address } = franchiseDto;

    const restaurantEntity = await this.restaurantService.readRestaurantById(restaurantId);
    // const addressEntity = await this.addressService.createAddress({ ...address, restaurantId });

    const franchiseEntity = this.repository.create({
      name,
      address,
      restaurant: restaurantEntity,
    });

    return this.repository.save(franchiseEntity);
  }

}
