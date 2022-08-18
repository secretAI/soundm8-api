import { Algorithm, Secret } from "jsonwebtoken";

type DatabaseConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  driver: string;
};

type RobotConfig = {
  token: string;
}

export type AppConfig = {
  env: string;
  postgres: DatabaseConfig;
  robot: RobotConfig;
};
