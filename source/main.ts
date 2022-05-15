/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsdoc/require-jsdoc */
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { HTTPLoggingInterceptor } from './common/interceptors/http.interceptor';
import { EnvVarsApp, EnvVarsEnum } from './config/env-vars';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);
  const appConfig = config.get<EnvVarsApp>(EnvVarsEnum.APP);
  const port = appConfig.PORT;

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HTTPLoggingInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Next Food')
    .setDescription('Next Food API services')
    .setVersion('1.0')
    .build();
  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string,
    ) => methodKey,
  };
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(port, () => {
    Logger.log(`Server listening on port ${port}`);
  });
}

bootstrap();
