import { Injectable } from '@nestjs/common';
import { Message } from 'src/Message/dominio/model/message.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async salvar({ idUsuario, message }: Message) {
    await this.prisma.log.create({
      data: {
        usuarioId: idUsuario,
        message: JSON.stringify(message.body),
        fila: message.fila,
        pattern: message.pattern,
        dateTime: new Date(),
      },
    });
  }
}
