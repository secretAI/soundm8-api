import { Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmErrorFilter } from './typeorm-error.filter';

export const TypeOrmErrorFilterProvider: Provider = {
  provide: APP_FILTER,
  useClass: TypeOrmErrorFilter,
};
