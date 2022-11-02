import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../../../dominio/models/usuario.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async cadastrar(usuario: Usuario): Promise<Usuario> {
    return await this.usuarioRepository.save(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ email: email });

    if (!usuario) {
      return null;
    }

    return usuario;
  }

  async listar(): Promise<Usuario[]> {
    const usuarios = await this.usuarioRepository.find();

    if (!usuarios) {
      return null;
    }

    return usuarios;
  }

  async buscar(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id: id });

    if (!usuario) {
      return null;
    }

    return usuario;
  }

  async atualizar(usuario: Usuario) {
    const resultado = await this.usuarioRepository.update(usuario.id, usuario);

    return resultado;
  }

  async excluir(id: number) {
    const resultado = await this.usuarioRepository.delete(id);

    return resultado;
  }

  async login(usuario: Usuario) {
    const resultado = await this.usuarioRepository.findOneBy({
      email: usuario.email,
      senha: usuario.senha,
    });

    if (!resultado) {
      return null;
    }

    return resultado;
  }
}
