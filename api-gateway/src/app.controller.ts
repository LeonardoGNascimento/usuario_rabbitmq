import { Controller, Get } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private client: ClientProxy;
  constructor(private readonly appService: AppService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:password@localhost:0000/'],
      },
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
