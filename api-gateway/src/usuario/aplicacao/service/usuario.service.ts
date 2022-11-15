import { Injectable } from '@nestjs/common';
var MD5 = require('crypto-js/md5');
import { Message } from 'src/core/message';
import { CadastrarUsuarioCommand } from 'src/usuario/dominio/command/cadastrarUsuario.command';

@Injectable()
export class UsuarioService {
  fila: string = 'usuarios';

  async listar() {
    return await Message.send({
      pattern: 'listar-usuarios',
      body: {},
      fila: this.fila,
      idUsuario: 'cla0eojjm0000uu2otp8pcq18',
    });
  }

  async cadastrar({ cpf, email, nome, senha }: CadastrarUsuarioCommand) {
    return await Message.send({
      pattern: 'cadastrar-usuario',
      body: {
        cpf,
        email,
        nome,
        senha: MD5(senha).toString(),
      },
      fila: this.fila,
      idUsuario: 'cla0eojjm0000uu2otp8pcq18',
    });
  }
}
