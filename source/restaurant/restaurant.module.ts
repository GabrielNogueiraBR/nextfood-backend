import { Module } from '@nestjs/common';

import { DatabaseModule } from './../database/database.module';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [
    DatabaseModule,
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
