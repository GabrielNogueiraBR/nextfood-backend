import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FranchiseProductModule } from '../franchise_product/franchise-product.module';
import { RestaurantModule } from './../restaurant/restaurant.module';
import { FranchiseController } from './franchise.controller';
import { Franchise } from './franchise.entity/franchise.entity';
import { FranchiseSchedule } from './franchise.entity/franchise.schedule';
import { FranchiseService } from './franchise.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Franchise,
      FranchiseSchedule,
    ]),
    RestaurantModule,
    FranchiseProductModule,
  ],
  providers: [
    FranchiseService,
  ],
  controllers: [
    FranchiseController,
  ],
})
export class FranchiseModule {}
