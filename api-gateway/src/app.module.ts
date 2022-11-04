import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Message } from './core/message';
import { RequestFilter } from './filter/Request.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: RequestFilter,
    },
    AppService,
    Message,
  ],
})
export class AppModule {}
