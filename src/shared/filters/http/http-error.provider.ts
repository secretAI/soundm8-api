import { Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './http-error.filter';

export const HttpErrorFilterProvider: Provider = {
  provide: APP_FILTER,
  useClass: HttpErrorFilter
};
