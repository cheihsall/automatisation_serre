import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DonneesService } from 'src/donnees/donnees.service';
import { CreateDonneeDto } from 'src/donnees/dto/create-donnee.dto';

@Injectable()
export class AuthService {
  constructor(
    private donneesService: DonneesService,
    private jwtService: JwtService,
  ) {}

  async login(createDonneeDto: CreateDonneeDto) {
    const payload = await this.donneesService.login(createDonneeDto);
    console.log(payload);

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
