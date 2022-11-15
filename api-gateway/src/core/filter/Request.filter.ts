import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class RequestFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch({ response }: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const { message, statusCode, error } = response;

    const responseBody = {
      statusCode,
      message,
      error,
    };

    httpAdapter.reply(
      host.switchToHttp().getResponse(),
      responseBody,
      statusCode,
    );
  }
}
