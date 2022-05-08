/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsdoc/require-jsdoc */
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { EnvVarsApp } from './config/env-vars';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);
  const appConfig = config.get<EnvVarsApp>('PORT');
  const port = appConfig.PORT;

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => {
    Logger.log(`Server listening on port ${port}`);
  });
}

bootstrap();
