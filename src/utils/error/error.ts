import { HttpStatus } from '@nestjs/common';

export class ApplicationError extends Error {
  public readonly status: number;

  constructor(
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    message: string,
  ) {
    super(message);
    this.status = status;
  }
}
