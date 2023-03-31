/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from './jwtAuthGuard';
import { CreateDonneeDto } from 'src/donnees/dto/create-donnee.dto';
import { User } from 'src/donnees/entities/donnee.entity';

type RequestWithUser = Request & { user: Partial<User> };

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Route pour l'authentification
  //@UseInterceptors(new ErrorsInterceptor())
  @Post('login')
  login(@Body() loginUserDto: CreateDonneeDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Req() request: RequestWithUser) {
    return request.user;
  }
}
