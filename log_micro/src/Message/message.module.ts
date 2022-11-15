import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageController } from './aplicacao/controller/message.controller';
import { MessageService } from './aplicacao/service/message.service';

@Module({
  controllers: [MessageController],
  providers: [PrismaService, MessageService],
  exports: [],
})
export class MessageModule {}
