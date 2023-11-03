export class HttpException extends Error {
  statusCode = 400;

  constructor(message: string, statusCode?: number) {
    super(message);

    this.statusCode = statusCode || 400;

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}
