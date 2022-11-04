import { UsuarioModule } from './Usuario/usuario.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { MessageModule } from './Message/message.module';

@Module({
  imports: [
    UsuarioModule,
    MessageModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
