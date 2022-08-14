import { FactoryProvider } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { ConfigService } from './config.service';

export const ConfigProvider: FactoryProvider = {
  provide: ConfigService,
  useFactory: (config: NestConfigService): ConfigService => {
    return new ConfigService(config);
  },
  inject: [NestConfigService],
};
