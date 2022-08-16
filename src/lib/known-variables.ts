import { Algorithm, Secret } from "jsonwebtoken";

export type KnownEnvironmentVariables = {
  NODE_ENV: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_DATABASE: string;
  DB_USER: string;
  DB_PASS: string;
  DB_DRIVER: string;
  /* auth */
  JWT_SECRET: Secret|string;
  JWT_ALGORITHM: Algorithm|string;
  SALT_ROUNDS: number;
};
