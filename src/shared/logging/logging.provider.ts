import { Provider } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "./logging.interceptor";

export const LoggingInterceptorProvider: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor
};
