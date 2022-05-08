import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

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
      type: 'mysql',
      host: databaseConfig.HOST,
      port: databaseConfig.PORT,
      username: databaseConfig.USERNAME,
      password: databaseConfig.PASSWORD,
      database: databaseConfig.DATABASE,
      entities: [
        'dist/**/*.entity.{ts,js}',
        '**/*.entity.{ts,js}',
      ],
      migrations: [
        'dist/migrations/*.{ts,js}',
        'migrations/*.{ts,js}',
      ],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      autoLoadEntities: true,
      synchronize: appConfig.NODE_ENV === 'local' ? true : false, // never use TRUE in production!
    };
  }

}
