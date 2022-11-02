import { UsuarioModule } from './Usuario/usuario.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Usuario } from './Usuario/dominio/models/usuario.model';

@Module({
  imports: [
    UsuarioModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      database: `${process.env.DATABASE}`,
      type: 'mysql',
      synchronize: true,
      username: `${process.env.DATABASE_USER}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      entities: [Usuario],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
