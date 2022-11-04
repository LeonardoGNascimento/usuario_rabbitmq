import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageController } from './aplicacao/controller/message.controller';

@Module({
  controllers: [MessageController],
  providers: [PrismaService],
  exports: [],
})
export class MessageModule {}
