import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('Ce parametre est inexistant', HttpStatus.BAD_REQUEST);
  }
}
