import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('Ce compte est inexistant', HttpStatus.BAD_REQUEST);
  }
}
