import { HttpStatus, RequestMethod } from '@nestjs/common';

export type HttpErrorFilterResponse = {
  path: string;
  code: HttpStatus;
  method: string;
  message: string | any;
  timestamp: string;
};
