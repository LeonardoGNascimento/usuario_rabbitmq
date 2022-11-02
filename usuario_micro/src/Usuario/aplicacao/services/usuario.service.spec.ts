import { Test } from '@nestjs/testing';
import { Usuario } from '../../dominio/models/usuario.model';
import { UsuarioRepository } from '../../infra/repository/mysql/usuario.repository';
import { UsuarioService } from './usuario.service';

const usuario: Usuario = Usuario.factory(1, 'leo', 'leo@leo', '123');
const usuarios: Usuario[] = [usuario, usuario];

describe('UsuarioService', () => {
  let usuarioService: UsuarioService;
  let usuarioRepository: UsuarioRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: UsuarioRepository,
          useValue: {
            cadastrar: jest.fn().mockResolvedValue(usuario),
            buscarPorEmail: jest.fn().mockResolvedValue(usuario),
            listar: jest.fn().mockResolvedValue(usuarios),
            buscar: jest.fn().mockResolvedValue(usuario),
            atualizar: jest.fn(),
            excluir: jest.fn(),
            login: jest.fn().mockResolvedValue(usuario),
          },
        },
      ], // Add
    }).compile();

    usuarioService = moduleRef.get<UsuarioService>(UsuarioService);
    usuarioRepository = moduleRef.get<UsuarioRepository>(UsuarioRepository);
  });

  it('should be defined', () => {
    expect(usuarioService).toBeDefined();
  });

  describe('login', () => {
    it('Deve me retornar usuário login', async () => {
      const resultado = await usuarioService.login(usuario);
      expect(resultado).toEqual(usuario);
    });

    it('Se não encontrar login válido deve retornar execption', async () => {
      jest.spyOn(usuarioRepository, 'login').mockReturnValueOnce(null);
      expect(usuarioService.login(usuario)).rejects.toThrowError();
    });
  });

  describe('cria', () => {
    it('Deve me retornar usuário criado', async () => {
      jest.spyOn(usuarioRepository, 'buscarPorEmail').mockReturnValueOnce(null);
      const resultado = await usuarioService.cria(usuario);
      expect(resultado.email).toEqual(usuario.email);
    });

    it('Se email já estivar cadastrado deve lançar exception', async () => {
      expect(usuarioService.cria(usuario)).rejects.toThrowError();
    });
  });

  describe('listar', () => {
    it('Lista todos os usuários', async () => {
      const resultado = await usuarioService.listar();
      expect(resultado).toEqual(usuarios);
    });

    it('Se não encontrar os usuários deve lançar exception', async () => {
      jest.spyOn(usuarioRepository, 'listar').mockReturnValueOnce(null);
      expect(usuarioService.listar()).rejects.toThrowError();
    });
  });

  describe('buscar', () => {
    it('Deve retornar um usuário', async () => {
      const resultado = await usuarioService.buscar(1);
      expect(resultado).toEqual(usuario);
    });

    it('Se não encontrar o usuário deve lançar exception', async () => {
      jest.spyOn(usuarioRepository, 'buscar').mockReturnValueOnce(null);
      expect(usuarioService.buscar(1)).rejects.toThrowError();
    });
  });

  describe('excluir', () => {
    it('Deve excluir um usuário', async () => {
      const resultado = await usuarioService.excluir(1);
      expect(resultado.message).toEqual('Usuário id 1 excluido com sucesso');
    });

    it('Se não encontrar o usuário deve lançar exception', async () => {
      jest.spyOn(usuarioRepository, 'buscar').mockReturnValueOnce(null);
      expect(usuarioService.excluir(1)).rejects.toThrowError();
    });
  });

  describe('atualizar', () => {
    it('Deve atualizar um usuário', async () => {
      const resultado = await usuarioService.atualizar(usuario);
      expect(resultado).toEqual(usuario);
    });

    it('Se não encontrar o usuário deve lançar exception', async () => {
      jest.spyOn(usuarioRepository, 'buscar').mockReturnValueOnce(null);
      expect(usuarioService.atualizar(usuario)).rejects.toThrowError();
    });
  });
});
