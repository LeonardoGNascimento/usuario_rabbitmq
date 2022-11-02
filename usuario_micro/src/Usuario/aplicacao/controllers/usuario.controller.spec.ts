import { Test } from '@nestjs/testing';
import { ExcluirUsuarioQuery } from '../../dominio/query/excluirUsuario.query';
import { Usuario } from '../../dominio/models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioController } from './usuario.controller';

const usuario: Usuario = Usuario.factory(1, 'leo', 'leo@leo', '123');
const usuarios: Usuario[] = [usuario, usuario];

const usuarioExcluido = new ExcluirUsuarioQuery(
  `Usuário id 1 excluido com sucesso`,
);
describe('UsuarioController', () => {
  let usuarioController: UsuarioController;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: {
            login: jest.fn(),
            cria: jest.fn().mockResolvedValue(usuario),
            buscar: jest.fn().mockResolvedValue(usuario),
            listar: jest.fn().mockResolvedValue(usuarios),
            excluir: jest.fn().mockResolvedValue(usuarioExcluido),
            atualizar: jest.fn().mockResolvedValue(usuario),
          },
        },
      ],
    }).compile();

    usuarioController = moduleRef.get<UsuarioController>(UsuarioController);
    usuarioService = moduleRef.get<UsuarioService>(UsuarioService);
  });

  it('usuario controller', () => {
    expect(usuarioController).toBeDefined();
  });

  describe('cria', () => {
    it('Deve criar um usuário', async () => {
      const resultado = await usuarioController.cria(usuario);
      expect(resultado).toEqual(usuario);
    });
  });

  describe('listar', () => {
    it('Deve retornar todos os usuários', async () => {
      const resultado = await usuarioController.listar();
      expect(resultado).toEqual(usuarios);
    });
  });

  describe('atualizar', () => {
    it('Deve atualizar um usuários', async () => {
      const resultado = await usuarioController.atualizar(1, usuario);
      expect(resultado).toEqual(usuario);
    });
  });

  describe('buscar', () => {
    it('Deve buscar um usuários', async () => {
      const resultado = await usuarioController.buscar(1);
      expect(resultado).toEqual(usuario);
    });
  });

  describe('excluir', () => {
    it('Deve excluir um usuários', async () => {
      const resultado = await usuarioController.excluir(1);
      expect(resultado.message).toEqual('Usuário id 1 excluido com sucesso');
    });
  });
});
