import { HttpStatus, RequestMethod } from "@nestjs/common";

export type HttpErrorFilterResponse = {
  path: string;
  code: HttpStatus;
  method: RequestMethod;
  message: string|any;
  timestamp: string;
};
