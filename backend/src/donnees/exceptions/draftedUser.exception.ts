import { HttpException, HttpStatus } from '@nestjs/common';

export class DraftedUserException extends HttpException {
  constructor() {
    super('Votre compte a été bloqué', HttpStatus.BAD_REQUEST);
  }
}
