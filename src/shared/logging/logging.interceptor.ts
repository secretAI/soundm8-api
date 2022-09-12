import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
  RequestMethod,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly _logger: Logger = new Logger('* LoggingInterceptor', {
    timestamp: false,
  });

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const method: string = req.method;
    const url: string = req.url;

    return next
      .handle()
      .pipe(tap(() => this._logger.verbose(`${method} -> ${url}`)));
  }
}
