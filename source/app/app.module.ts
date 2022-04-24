import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../config/env-vars';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { DatabaseModule } from './../database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ // https://docs.nestjs.com/techniques/configuration
      isGlobal: true,
      load: [
        configuration,
      ],
    }),
    DatabaseModule,
    RestaurantModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
