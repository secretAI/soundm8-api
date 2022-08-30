type DatabaseConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  driver: string;
};

type SonicApiConfig = {
  url: string;
  apiKey: string;
}

export type AppConfig = {
  env: string;
  postgres: DatabaseConfig;
  sonicApi: SonicApiConfig;
};
