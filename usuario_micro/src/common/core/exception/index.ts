export class RequestException {
  public body: object;
  constructor(public message: string, public status: number) {
    this.body = {
      message,
      status,
    };
  }
}
