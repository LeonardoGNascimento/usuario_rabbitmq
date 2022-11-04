import { Controller, UseFilters } from '@nestjs/common';
import { Usuario } from '../../dominio/models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import {
  EventPattern,
  Payload,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { RequestExceptionFilter } from 'src/common/core/filter/HttpException.filter';

@UseFilters(new RequestExceptionFilter())
@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  // @EventPattern('criar-usuario')
  // async cria(@Payload() usuario: Usuario): Promise<Usuario> {
  //   return await this.usuarioService.cria(usuario);
  // }

  @MessagePattern('listar-usuarios')
  async listar(): Promise<Usuario[] | RpcException> {
    return await this.usuarioService.listar();
  }

  // @MessagePattern('atualizar-usuario')
  // async atualizar(@Payload() usuario: Usuario): Promise<Usuario> {
  //   return await this.usuarioService.atualizar(usuario);
  // }

  // @MessagePattern('buscar-usuario')
  // async buscar(@Payload() id: number): Promise<Usuario> {
  //   return await this.usuarioService.buscar(id);
  // }

  // @MessagePattern('buscar-email')
  // async buscarUsuarioEmail(@Payload() email: string): Promise<Usuario> {
  //   return await this.usuarioService.buscarUsuarioEmail(email);
  // }

  // @EventPattern('excluir-usuario')
  // async excluir(@Payload() id: number): Promise<void> {
  //   this.usuarioService.excluir(id);
  // }
}
