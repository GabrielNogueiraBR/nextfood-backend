import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from './../product/product.module';
import { RestaurantModule } from './../restaurant/restaurant.module';
import { FranchiseController } from './franchise.controller';
import { Franchise } from './franchise.entity/franchise.entity';
import { FranchiseProduct } from './franchise.entity/franchise.product.entity';
import { FranchiseSchedule } from './franchise.entity/franchise.schedule';
import { FranchiseProductService } from './franchise.service/franchise.product.service';
import { FranchiseService } from './franchise.service/franchise.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Franchise,
      FranchiseProduct,
      FranchiseSchedule,
    ]),
    ProductModule,
    RestaurantModule,
  ],
  providers: [
    FranchiseService,
    FranchiseProductService,
  ],
  controllers: [
    FranchiseController,
  ],
  exports: [
    FranchiseService,
  ],
})
export class FranchiseModule {}
