/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsdoc/require-jsdoc */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import configuration from './config/env-vars';

async function bootstrap() {
  const appConfig = configuration().app;
  const port = appConfig.port;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

  Logger.log(`Server listening on port ${port}`);
}

bootstrap();
