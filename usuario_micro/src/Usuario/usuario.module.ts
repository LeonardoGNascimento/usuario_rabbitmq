import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioController } from './aplicacao/controllers/usuario.controller';
import { UsuarioService } from './aplicacao/services/usuario.service';
import { UsuarioRepository } from './infra/repository/mysql/usuario.repository';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository, PrismaService],
  exports: [UsuarioService, UsuarioRepository],
})
export class UsuarioModule {}
