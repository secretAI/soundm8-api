import { ExceptionFilter, Catch, HttpException, RequestMethod, ArgumentsHost, Logger, HttpCode, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { TypeOrmErrorFilterResponse } from './types';

@Catch(QueryFailedError)
export class TypeOrmErrorFilter implements ExceptionFilter {
  private readonly _logger: Logger = new Logger('* TypeOrmError', {
    timestamp: false
  });

  public catch(
    exception: QueryFailedError, 
    host: ArgumentsHost
  ): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const data: TypeOrmErrorFilterResponse = {
      path: req.url,
      name: exception.name,
      message: exception.message,
      query: exception.query,
      params: exception.parameters,
      timestamp: new Date().toISOString(),
    };
    this._logger.error(
      `Message: ${data.message}`, 
      JSON.stringify(data)
    );

    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(data);
  };
};
