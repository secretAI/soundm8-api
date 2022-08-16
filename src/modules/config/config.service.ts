import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { KnownEnvironmentVariables } from '../../lib/known-variables';
import { AppConfig } from './app.config';

@Injectable()
export class ConfigService {
  constructor(
    private readonly _config: NestConfigService<KnownEnvironmentVariables>,
  ) {}

  private getEnvironmentVariable(
    key: keyof KnownEnvironmentVariables,
  ): string {
    const value = this._config.get(key);
    if(!value) {
      throw new HttpException(
        `* Variable ${key} not found in .env`,
        HttpStatus.NOT_FOUND, 
      );
    }

      return value;
  }

  public get config(): AppConfig {
    return {
      env: this.getEnvironmentVariable('NODE_ENV'),
      postgres: {
        host: this.getEnvironmentVariable('DB_HOST'),
        port: Number(this.getEnvironmentVariable('DB_PORT')),
        database: this.getEnvironmentVariable('DB_DATABASE'),
        username: this.getEnvironmentVariable('DB_USER'),
        password: this.getEnvironmentVariable('DB_PASS'),
        driver: this.getEnvironmentVariable('DB_DRIVER')
      },
    };
  }
}
