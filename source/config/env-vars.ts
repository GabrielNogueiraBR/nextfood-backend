/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

export enum EnvVarsEnum {
  APP='app',
  DB='database',
}

export enum EnvironmentType {
  LOCAL='local',
  DEV='development',
  PROD='production'
}

export class EnvVarsApp {

  @IsEnum(EnvironmentType)
  public NODE_ENV: string;

  @IsNumber()
  public PORT: number;

}

export class EnvVarsDatabase {

  @IsString()
  public HOST: string;

  @IsNumber()
  public PORT: number;

  @IsString()
  public USERNAME: string;

  @IsString()
  public PASSWORD: string;

  @IsString()
  public DATABASE: string;

}

export class EnvVars {

  @IsObject()
  @ValidateNested()
  @Type(() => EnvVarsApp)
  public app: EnvVarsApp;

  @IsObject()
  @ValidateNested()
  @Type(() => EnvVarsDatabase)
  public database: EnvVarsDatabase;

}

export default (): EnvVars => ({
  app: {
    NODE_ENV: process.env.NODE_ENV || 'local',
    PORT: Number.parseInt(process.env.PORT, 10) || 8080,
  },
  database: {
    HOST: process.env.DB_HOST,
    PORT: Number.parseInt(process.env.DB_PORT, 10) || 3306,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
  },
});
