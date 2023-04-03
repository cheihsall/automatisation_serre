import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectPasswordException extends HttpException {
  constructor() {
    super('Ancien mot de passe incorrect', HttpStatus.FORBIDDEN);
  }
}
