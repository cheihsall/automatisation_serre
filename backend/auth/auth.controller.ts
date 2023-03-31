import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DonneesService } from 'src/donnees/donnees.service';
import { CreateDonneeDto } from 'src/donnees/dto/create-donnee.dto';
import { User } from 'src/donnees/entities/donnee.entity';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
type RequestWithUser = Request & { user: Partial<User> };
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() createDonneeDto: CreateDonneeDto) {
    return this.authService.login(createDonneeDto);
  }

 // @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() request: RequestWithUser) {
    return request.user;
  }
}
