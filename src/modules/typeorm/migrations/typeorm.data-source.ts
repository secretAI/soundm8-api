import { DataSource } from "typeorm";
import { ConfigService as NestConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "../../config";
import { UserEntity } from "../../../domain/users/entity";
import { OrderEntity } from "../../../domain/orders/entity";
import { InviteCodeEntity } from "../../../domain/invite-codes/entity";
import { migrations1661870186463 } from "../../../migrations/1661870186463-migrations";

const config = new ConfigService(new NestConfigService()).config.db;
export const AppDataSource = new DataSource({
  type: config.driver as TypeOrmModuleOptions['driver'],
  host: config.host,
  port: config.port,
  database: config.database,
  username: config.username,
  password: config.password,
  entities: [
    UserEntity,
    OrderEntity,
    InviteCodeEntity
  ],
  migrations: [
    migrations1661870186463
  ]
});

AppDataSource.initialize();

