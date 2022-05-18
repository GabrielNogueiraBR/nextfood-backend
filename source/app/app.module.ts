import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '../category/category.module';
import configuration from '../config/env-vars';
import { FranchiseModule } from '../franchise/franchise.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { TableModule } from '../table/table.module';
import { UserModule } from '../user/user.module';
import { AddressModule } from './../address/address.module';
import { TypeOrmConfigService } from './../config/typeorm.service';
import { EmployeeModule } from './../employee/employee.module';
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
    AddressModule,
    CategoryModule,
    EmployeeModule,
    FranchiseModule,
    RestaurantModule,
    TableModule,
    UserModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
