import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/';
import { OrderEntity } from '../../database/entities/'
import { ConfigService } from '../config';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  private readonly _logger: Logger = new Logger('* TypeOrm', {
    timestamp: false
  });

  constructor(private readonly _service: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, port, database, username, password, driver } =
      this._service.config.postgres;
    this._logger.verbose('TypeOrm options generated');

    return {
      database,
      username,
      password,
      host,
      port,
      type: driver as TypeOrmModuleOptions['driver'],
      synchronize: this._service.config.env == 'development', /* false for production */
      keepConnectionAlive: false,
      logging: false,
      applicationName: 'soundm8',
      entities: [
        OrderEntity,
        UserEntity
      ]
    };
  }
}
