import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  providers: [
    FranchiseService,
  ],
  controllers: [
    FranchiseController,
  ],
  exports: [
    FranchiseService,
  ],
})
export class FranchiseModule {}
