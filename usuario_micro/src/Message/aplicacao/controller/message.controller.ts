import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';

interface IMessage {
  idUsuario: string;
  message: object;
}

@Controller()
export class MessageController {
  constructor(private prisma: PrismaService) {}

  @EventPattern('log-mensagem')
  async salvar(@Payload() { idUsuario, message }: IMessage) {
    await this.prisma.messageLog.create({
      data: {
        usuarioId: idUsuario,
        message: JSON.stringify(message),
      },
    });
  }
}
