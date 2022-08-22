type DatabaseConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  driver: string;
};

export type AppConfig = {
  env: string;
  postgres: DatabaseConfig;
};
