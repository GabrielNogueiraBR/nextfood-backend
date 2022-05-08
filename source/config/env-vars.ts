/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export interface EnvVars {
  app: EnvVarsApp;
  database: EnvVarsDatabase;
}

export interface EnvVarsApp {
  NODE_ENV: string;
  PORT: number;
}

export interface EnvVarsDatabase {
  HOST: string;
  PORT: number;
  USERNAME: string;
  PASSWORD: string;
  DATABASE: string;
}

export default (): EnvVars => ({
  app: {
    NODE_ENV: process.env.NODE_ENV || 'local',
    PORT: Number.parseInt(process.env.PORT, 10) || 8080,
  },
  database: {
    HOST: process.env.DB_HOST,
    PORT: Number.parseInt(process.env.PORT, 10),
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
  },
});
