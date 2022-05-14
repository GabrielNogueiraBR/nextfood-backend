import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModule } from '../address/address.module';
import { RestaurantModule } from './../restaurant/restaurant.module';
import { FranchiseController } from './franchise.controller';
import { Franchise } from './franchise.entity';
import { FranchiseService } from './franchise.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Franchise,
    ]),
    AddressModule,
    RestaurantModule,
  ],
  providers: [
    FranchiseService,
  ],
  controllers: [
    FranchiseController,
  ],
})
export class FranchiseModule {}
