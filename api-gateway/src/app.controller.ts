import { Controller, Get } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Message } from './core/message';

@Controller()
export class AppController {
  client: ClientProxy;
  clientLog: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:123456@localhost:5672'],
        queue: 'usuarios',
      },
    });
  }

  @Get()
  async listar() {
    var i = 0;

    while (i < 1000) {
      i = i + 1;
      Message.send({
        pattern: 'listar-usuarios',
        body: {},
        fila: 'usuarios',
        idUsuario: 'cla0eojjm0000uu2otp8pcq18',
      });
    }
  }
}
