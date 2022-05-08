import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { EnvVarsApp, EnvVarsDatabase } from './env-vars';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

  public constructor(
    private readonly configService: ConfigService,
  ) { }

  /**
   *
   */
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseConfig = this.configService.get<EnvVarsDatabase>('database');
    const appConfig = this.configService.get<EnvVarsApp>('database');

    return {
      type: 'mysql',
      host: databaseConfig.HOST,
      port: databaseConfig.PORT,
      username: databaseConfig.USERNAME,
      password: databaseConfig.PASSWORD,
      database: databaseConfig.DATABASE,
      entities: [ 'dist/**/*.entity.{ts,js}' ],
      migrations: [ 'dist/migrations/*.{ts,js}' ],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: appConfig.NODE_ENV === 'local' ? true : false, // never use TRUE in production!
    };
  }

}
