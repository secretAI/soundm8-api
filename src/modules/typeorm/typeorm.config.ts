import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '../config';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly _service: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, port, database, username, password, driver } =
      this._service.config.postgres;

    return {
      database,
      username,
      password,
      host,
      port,
      type: driver as TypeOrmModuleOptions["driver"],
      synchronize: false,
      keepConnectionAlive: false,
      logging: false,
      applicationName: 'soundm8',
      // entities: [

      // ],
    };
  }
}
