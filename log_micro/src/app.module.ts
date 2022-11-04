import { Module } from '@nestjs/common';
import { MessageModule } from './Message/message.module';

@Module({
  imports: [MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
