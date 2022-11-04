import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

interface IMessage {
  pattern: string;
  body: any;
  fila: string;
  idUsuario: string;
}

interface ILog {
  idUsuario: string;
  body: any;
}

export class Message {
  client: ClientProxy;
  clientLog: ClientProxy;
  constructor() {}

  static async log({ body, idUsuario }: ILog) {
    const client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:123456@localhost:5672'],
        queue: 'log',
      },
    });
    client.emit('log-mensagem', { idUsuario, message: body });
  }

  static async send({ body, fila, pattern, idUsuario }: IMessage) {
    Message.log({ body: { pattern, fila, body }, idUsuario });
    const client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:123456@localhost:5672'],
        queue: fila,
      },
    });
    return client.send(pattern, body);
  }
}
