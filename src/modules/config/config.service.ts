import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { KnownEnvironmentVariables } from '../../lib/known-variables';
import { AppConfig } from './app.config';

@Injectable()
export class ConfigService {
  constructor(
    private readonly _config: NestConfigService<KnownEnvironmentVariables>
  ) {}

  private getEnvironmentVariable(key: keyof KnownEnvironmentVariables): string {
    const value = this._config.get(key);
    if (!value) {
      throw new NotFoundException(`* Variable ${key} not found in .env`);
    }

    return value;
  }

  public get config(): AppConfig {
    return {
      env: this.getEnvironmentVariable('NODE_ENV'),
      db: {
        host: this.getEnvironmentVariable('DB_HOST'),
        port: Number(this.getEnvironmentVariable('DB_PORT')),
        database: this.getEnvironmentVariable('DB_DATABASE'),
        username: this.getEnvironmentVariable('DB_USER'),
        password: this.getEnvironmentVariable('DB_PASS'),
        driver: this.getEnvironmentVariable('DB_DRIVER'),
      },
      /* ToDo remove this */
      sonicApi: {
        url: this.getEnvironmentVariable('SONIC_API_URL'),
        apiKey: this.getEnvironmentVariable('SONIC_API_KEY'),
      },
      http: {
        maxRedirects: Number(this.getEnvironmentVariable('HTTP_MAX_REDIRECTS')),
        timeout: Number(this.getEnvironmentVariable('HTTP_TIMEOUT')),
      },
    };
  }
}
