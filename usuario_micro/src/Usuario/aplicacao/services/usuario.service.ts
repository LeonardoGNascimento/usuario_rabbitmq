import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usuario } from '../../dominio/models/usuario.model';
import { UsuarioRepository } from '../../infra/repository/mysql/usuario.repository';
import { RpcException } from '@nestjs/microservices';
import { RequestException } from 'src/common/core/exception';

@Injectable()
export class UsuarioService {
  constructor(private usuarioRepository: UsuarioRepository) {}

  // public async login(usuario: Usuario) {
  //   const resultado = await this.usuarioRepository.login(usuario);

  //   if (!resultado) {
  //     throw new RpcException('Usuario não encontrado');
  //   }

  //   return resultado;
  // }

  public async cria(usuarioRequest: Usuario): Promise<Usuario> {
    const verificarEmail = await this.usuarioRepository.buscarPorEmail(
      usuarioRequest.email,
    );

    if (verificarEmail) {
      throw new RequestException('Email já cadastrado', 400);
    }

    const verificarCpf = await this.usuarioRepository.buscarPorCpf(
      usuarioRequest.cpf,
    );

    if (verificarCpf) {
      throw new RequestException('CPF já cadastrado', 400);
    }

    return await this.usuarioRepository.cria(usuarioRequest);
  }

  // public async buscar(id: number): Promise<Usuario> {
  //   const usuario = await this.usuarioRepository.buscar(id);

  //   if (!usuario) {
  //     throw new RpcException('Usuario não encontrado');
  //   }

  //   return usuario;
  // }

  public async listar(): Promise<Usuario[] | RpcException> {
    const usuarios = await this.usuarioRepository.listar();

    if (!usuarios) {
      throw new RequestException('Nenhum usuário encontrado', 404);
    }

    return usuarios;
  }

  // public async excluir(id: number): Promise<void> {
  //   await this.usuarioRepository.excluir(id);
  // }

  // public async atualizar(usuario: Usuario): Promise<Usuario> {
  //   await this.buscar(usuario.id);
  //   await this.usuarioRepository.atualizar(usuario);

  //   return usuario;
  // }

  public async buscarEmail(email: string): Promise<Usuario> {
    return await this.usuarioRepository.buscarPorEmail(email);
  }
}
