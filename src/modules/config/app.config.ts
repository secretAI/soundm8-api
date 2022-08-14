type PostgresConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  driver: string;
};

export type AppConfig = {
  postgres: PostgresConfig;
};
