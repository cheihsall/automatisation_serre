import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsException extends HttpException {
  constructor() {
    super('ce compte existe deja', HttpStatus.CONFLICT);
  }
}
