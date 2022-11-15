import { Module } from '@nestjs/common';
import { UsuarioController } from './aplicacao/controller/usuario.controller';
import { UsuarioService } from './aplicacao/service/usuario.service';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
