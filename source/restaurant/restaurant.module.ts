import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RestaurantController } from './restaurant.controller';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Restaurant,
    ]),
  ],
  providers: [
    RestaurantService,
  ],
  controllers: [
    RestaurantController,
  ],
  exports: [
    RestaurantService,
  ],
})
export class RestaurantModule {}
