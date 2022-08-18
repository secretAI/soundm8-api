import {
  CallHandler, 
  ExecutionContext, 
  HttpException, 
  HttpStatus, 
  Injectable, 
  Logger, 
  NestInterceptor, 
  RequestMethod
} from "@nestjs/common";
import { Request } from "express";
import { Observable, tap } from "rxjs";
import { Telegraf } from 'telegraf';
import { TelegrafRequest } from "./types/telegraf-request.interface";


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly _logger: Logger = new Logger('* LoggingInterceptor', {
    timestamp: false
  });

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request|TelegrafRequest = context.switchToHttp().getRequest();
    switch(Boolean(req.url && req.method)) {
      case true: {
        const method: RequestMethod = (req.method as unknown) as RequestMethod;
        const url: string = req.url;

        return next
          .handle()
          .pipe(
            tap(() => this._logger.verbose(`${method} -> ${url}`))
          );
      };
      case false: {
        return next
          .handle()
          .pipe(
            tap(() => this._logger.verbose('Telegram Request'))
          )
      };
      default: {
        throw new HttpException(
          'Interceptor unhandled exception', 
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
