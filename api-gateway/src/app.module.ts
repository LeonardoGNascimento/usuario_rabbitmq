import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Message } from './core/message';
import { RequestFilter } from './core/filter/Request.filter';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: RequestFilter,
    },
    Message,
  ],
})
export class AppModule {}
