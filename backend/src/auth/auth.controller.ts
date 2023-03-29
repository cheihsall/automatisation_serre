import { Body, Controller, Post } from '@nestjs/common';
import { DonneesService } from 'src/donnees/donnees.service';
import { CreateDonneeDto } from 'src/donnees/dto/create-donnee.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() createDonneeDto: CreateDonneeDto) {
    return this.authService.login(createDonneeDto);
  }
}
