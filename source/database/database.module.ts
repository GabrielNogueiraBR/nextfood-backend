import { Module } from '@nestjs/common';

import { databaseProvider } from './../config/faunadb.connection';

@Module({
  providers: [
    ...databaseProvider,
  ],
  exports: [
    ...databaseProvider,
  ],
})
export class DatabaseModule { }
