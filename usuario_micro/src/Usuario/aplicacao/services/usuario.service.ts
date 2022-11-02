import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usuario } from '../../dominio/models/usuario.model';
import { UsuarioRepository } from '../../infra/repository/mysql/usuario.repository';
import { RpcException } from '@nestjs/microservices';

export class FitRpcException extends RpcException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message);
    this.initStatusCode(statusCode);
  }
  public status: number;

  private initStatusCode(statusCode) {
    this.status = statusCode;
  }
}

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  public async login(usuario: Usuario) {
    const resultado = await this.usuarioRepository.login(usuario);

    if (!resultado) {
      throw new RpcException('Usuario não encontrado');
    }

    return resultado;
  }

  public async cria(usuarioRequest: Usuario): Promise<Usuario> {
    const verificarEmail = await this.usuarioRepository.buscarPorEmail(
      usuarioRequest.email,
    );

    if (verificarEmail) {
      throw new FitRpcException('Email já cadastrado', 400);
    }

    return await this.usuarioRepository.cadastrar(usuarioRequest);
  }

  public async buscar(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.buscar(id);

    if (!usuario) {
      throw new RpcException('Usuario não encontrado');
    }

    return usuario;
  }

  public async listar(): Promise<Usuario[]> {
    const usuarios = await this.usuarioRepository.listar();

    if (!usuarios) {
      throw new HttpException(
        'Nenhum usuario encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return usuarios;
  }

  public async excluir(id: number): Promise<void> {
    await this.usuarioRepository.excluir(id);
  }

  public async atualizar(usuario: Usuario): Promise<Usuario> {
    await this.buscar(usuario.id);
    await this.usuarioRepository.atualizar(usuario);

    return usuario;
  }

  public async buscarUsuarioEmail(email: string): Promise<Usuario> {
    return await this.usuarioRepository.buscarPorEmail(email);
  }
}
