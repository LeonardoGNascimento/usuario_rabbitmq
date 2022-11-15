import { Injectable } from '@nestjs/common';
import { Usuario } from '../../../dominio/models/usuario.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioRepository {
  constructor(private prisma: PrismaService) {}

  async cria(usuario: Usuario): Promise<Usuario> {
    return await this.prisma.usuario.create({
      data: usuario,
    });
  }

  async buscarPorEmail(email: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        email,
      },
    });

    if (!usuario) {
      return null;
    }

    return usuario;
  }

  async buscarPorCpf(cpf: number): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        cpf,
      },
    });

    if (!usuario) {
      return null;
    }

    return usuario;
  }

  async listar(): Promise<Usuario[]> {
    const usuarios = await this.prisma.usuario.findMany();

    if (usuarios.length <= 0) {
      return null;
    }

    return usuarios;
  }

  // async buscar(id: number): Promise<Usuario> {
  //   const usuario = await this.usuarioRepository.findOneBy({ id: id });

  //   if (!usuario) {
  //     return null;
  //   }

  //   return usuario;
  // }

  // async atualizar(usuario: Usuario) {
  //   const resultado = await this.usuarioRepository.update(usuario.id, usuario);

  //   return resultado;
  // }

  // async excluir(id: number) {
  //   const resultado = await this.usuarioRepository.delete(id);

  //   return resultado;
  // }

  // async login(usuario: Usuario) {
  //   const resultado = await this.usuarioRepository.findOneBy({
  //     email: usuario.email,
  //     senha: usuario.senha,
  //   });

  //   if (!resultado) {
  //     return null;
  //   }

  //   return resultado;
  // }
}
