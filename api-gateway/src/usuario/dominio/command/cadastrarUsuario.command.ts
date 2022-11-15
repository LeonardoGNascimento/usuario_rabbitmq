import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CadastrarUsuarioCommand {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  @IsInt()
  cpf: number;
}
