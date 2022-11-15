import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CadastrarUsuarioCommand } from 'src/usuario/dominio/command/cadastrarUsuario.command';
import { UsuarioService } from '../service/usuario.service';

@Controller({ path: 'usuario', version: '1' })
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  async listar(): Promise<Observable<any>> {
    return await this.usuarioService.listar();
  }

  @Post()
  async cadastrar(@Body() cadastrarUsuarioCommand: CadastrarUsuarioCommand) {
    return await this.usuarioService.cadastrar(cadastrarUsuarioCommand);
  }
}
