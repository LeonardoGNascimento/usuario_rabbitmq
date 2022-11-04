import { UsuarioModule } from './Usuario/usuario.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
@Module({
  imports: [
    UsuarioModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
