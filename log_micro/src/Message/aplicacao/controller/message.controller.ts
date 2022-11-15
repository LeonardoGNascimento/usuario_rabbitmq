import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Message } from 'src/Message/dominio/model/message.model';
import { MessageService } from '../service/message.service';

@Controller()
export class MessageController {
  constructor(private messageService: MessageService) {}

  @EventPattern('log-mensagem')
  async salvar(@Payload() message: Message) {
    await this.messageService.salvar(message);
  }
}
