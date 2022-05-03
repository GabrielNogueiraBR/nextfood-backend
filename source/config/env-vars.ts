/* eslint-disable @typescript-eslint/explicit-function-return-type */

export interface EnvVars {
  app: EnvVarsApp;
  database: EnvVarsDatabase;
}

export interface EnvVarsApp {
  port: number;
}

export interface EnvVarsDatabase {
  secret: string;
  region: string;
  restaurant_collection: string;
}

export default (): EnvVars => ({
  app: {
    port: Number.parseInt(process.env.PORT, 10) || 8080,
  },
  database: {
    secret: String(process.env.FAUNADB_SECRET),
    region: String(process.env.FAUNADB_REGION),
    restaurant_collection: String('restaurant'),
  },
});
