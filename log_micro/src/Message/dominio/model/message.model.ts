export interface Message {
  idUsuario: string;
  message: {
    pattern: string;
    fila: string;
    body: object;
  };
}
