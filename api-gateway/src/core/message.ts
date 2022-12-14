import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ILog } from './dominio/ILog.interface';
import { IMessage } from './dominio/IMessage.interface';

export class Message {
  client: ClientProxy;
  clientLog: ClientProxy;
  constructor() {}

  static async createClient(fila: string): Promise<ClientProxy> {
    const client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:123456@localhost:5672'],
        queue: fila,
      },
    });
    return client;
  }

  static async log({ body, idUsuario }: ILog) {
    const client = await Message.createClient('log');
    client.emit('log-mensagem', { idUsuario, message: body });
  }

  static async send({ body, fila, pattern, idUsuario }: IMessage) {
    // Message.log({ body: { pattern, fila, body }, idUsuario });
    const client = await Message.createClient(fila);
    return client.send(pattern, body);
  }
}
