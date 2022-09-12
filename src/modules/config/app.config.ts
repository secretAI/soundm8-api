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
};

type HttpConfig = {
  timeout: number;
  maxRedirects: number;
};

export type AppConfig = {
  env: string;
  db: DatabaseConfig;
  sonicApi: SonicApiConfig;
  http: HttpConfig;
};
