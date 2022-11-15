import { HttpStatus } from '@nestjs/common';

export class RequestException {
  public body: object;
  constructor(public message: string, public statusCode: number) {
    this.body = {
      response: { message, statusCode, error: HttpStatus[statusCode] },
    };
  }
}
