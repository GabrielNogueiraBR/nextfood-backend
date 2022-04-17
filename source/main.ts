/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsdoc/require-jsdoc */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const appConfig = configuration().app;
  const port = appConfig.port;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  Logger.log(`Server listening on port ${port}`);
}

bootstrap();
