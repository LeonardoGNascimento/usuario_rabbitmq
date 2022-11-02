import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'nome é obrigatório' })
  @IsString({ message: 'nome deve ser do tipo string' })
  nome: string;

  @Column()
  @IsNotEmpty({ message: 'email é obrigatório' })
  @IsString({ message: 'email deve ser do tipo string' })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  @IsNotEmpty({ message: 'senha é obrigatório' })
  @IsString({ message: 'senha deve ser do tipo string' })
  senha: string;

  static factory(
    id: number | null,
    nome: string,
    email: string,
    senha: string = '',
  ) {
    const usuario = new Usuario();
    usuario.id = id;
    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha
      ? crypto.createHash('md5').update(senha).digest('hex')
      : '';

    return usuario;
  }
}
