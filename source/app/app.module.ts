import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '../category/category.module';
import configuration from '../config/env-vars';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { TypeOrmConfigService } from './../config/typeorm.service';
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
    TypeOrmModule.forRootAsync({ // https://docs.nestjs.com/techniques/database
      useClass: TypeOrmConfigService,
    }),
    CategoryModule,
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
