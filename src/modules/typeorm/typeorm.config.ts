import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { InviteCodeEntity } from 'src/domain/invite-codes';
import { OrderEntity } from 'src/domain/orders';
import { UserEntity } from 'src/domain/users';
import { ConfigService } from '../config';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  private readonly _logger: Logger = new Logger('* TypeOrm', {
    timestamp: false
  });

  constructor(private readonly _service: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const { 
      host, 
      port, 
      database, 
      username, 
      password, 
      driver 
    } = this._service.config.postgres;
    const { env } = this._service.config; 
    this._logger.verbose('TypeOrm options generated');

    return {
      database,
      username,
      password,
      host,
      port,
      type: driver as TypeOrmModuleOptions['driver'],
      synchronize: env === 'development', /* false for production */
      keepConnectionAlive: false,
      logging: false,
      applicationName: 'soundm8',
      entities: [
        OrderEntity,
        UserEntity,
        InviteCodeEntity
      ]
    };
  }
}
