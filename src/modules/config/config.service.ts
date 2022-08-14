import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { KnownEnvironmentVariables } from './env/variables';
import { AppConfig } from './app.config';
import { ApplicationError } from 'src/utils/error/error';

@Injectable()
export class ConfigService {
  constructor(
    private readonly _config: NestConfigService<KnownEnvironmentVariables>,
  ) {}

  private getEnvironmentVariables(
    key: keyof KnownEnvironmentVariables,
  ): string {
    const value = this._config.get(key);
    if(!value) {
      throw new ApplicationError(
        HttpStatus.NOT_FOUND, 
        `* Variable ${key} not found in .env`
      );
    }

      return value;
  }

  public get config(): AppConfig {
    return {
      postgres: {
        host: this.getEnvironmentVariables('DB_HOST'),
        port: Number(this.getEnvironmentVariables('DB_PORT')),
        database: this.getEnvironmentVariables('DB_DATABASE'),
        username: this.getEnvironmentVariables('DB_USER'),
        password: this.getEnvironmentVariables('DB_PASS'),
        driver: this.getEnvironmentVariables('DB_DRIVER')
      }
    };
  }
}
