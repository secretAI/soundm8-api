import { ExceptionFilter, Catch, HttpException, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpErrorFilterResponse } from './types';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  private readonly _logger: Logger = new Logger('* HttpError', {
    timestamp: false
  });

  public catch(
    exception: HttpException, 
    host: ArgumentsHost
  ): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const data: HttpErrorFilterResponse = {
      path: req.url,
      code: exception.getStatus(),
      method: req.method,
      message: exception['response'].message || exception.message || null,
      timestamp: new Date().toISOString(),
    };
    this._logger.error(
      `Message: ${data.message}`, 
      JSON.stringify(data)
    );

    res.status(data.code)
      .json(data);
  };
};