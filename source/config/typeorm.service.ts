import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Category } from '../category/category.entity';
import { Address } from './../address/address.entity';
import { Employee } from './../employee/employee.entity';
import { Franchise } from './../franchise/franchise.entity/franchise.entity';
import { Product } from './../product/product.entity';
import { Restaurant } from './../restaurant/restaurant.entity';
import { Table } from './../table/table.entity';
import { User } from './../user/user.entity';
import { EnvVarsApp, EnvVarsDatabase, EnvVarsEnum } from './env-vars';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

  public constructor(
    private readonly configService: ConfigService,
  ) { }

  /**
   * Crate TypeOrm options.
   */
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseConfig = this.configService.get<EnvVarsDatabase>(EnvVarsEnum.DB);
    const appConfig = this.configService.get<EnvVarsApp>(EnvVarsEnum.APP);

    return {
      type: 'postgres',
      host: databaseConfig.HOST,
      port: databaseConfig.PORT,
      username: databaseConfig.USERNAME,
      password: databaseConfig.PASSWORD,
      database: databaseConfig.DATABASE,
      entities: [
        Address,
        Category,
        Employee,
        Franchise,
        Product,
        Restaurant,
        Table,
        User,
      ],
      logger: 'file',
      autoLoadEntities: true,
      synchronize: appConfig.NODE_ENV === 'local' ? true : false, // never use TRUE in production!
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    };
  }

}
