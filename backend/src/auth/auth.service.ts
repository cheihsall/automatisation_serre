import { ConsoleLogger, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { DonneesService } from 'src/donnees/donnees.service';
import { CreateDonneeDto } from 'src/donnees/dto/create-donnee.dto';

@Injectable()
export class AuthService {
  logger = new ConsoleLogger();
  constructor(
    private userService: DonneesService,
    private jwtService: JwtService,
  ) {}
  //creation du token pour l'utilisateur
  async login(loginUserDto: CreateDonneeDto) {
    const payload = await this.userService.login(loginUserDto);
    //signature du token de l'utilisateur
    return { access_token: this.jwtService.sign(payload) };
  }
}
