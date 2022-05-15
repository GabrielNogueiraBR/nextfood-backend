import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RestaurantService } from './../restaurant/restaurant.service';
import { FranchiseCreateDto, FranchiseDto } from './franchise.dto/franchise.dto';
import { Franchise } from './franchise.entity/franchise.entity';

@Injectable()
export class FranchiseService {

  public constructor(
    @InjectRepository(Franchise)
    private readonly repository: Repository<Franchise>,
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

}
