import * as faunadb from 'faunadb';

import configuration from './env-vars';

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): faunadb.Client => {
      const databaseConfig = configuration().database;

      const client = new faunadb.Client({
        secret: databaseConfig.secret,
        domain: databaseConfig.region,
      });

      return client;
    },
  },
];
