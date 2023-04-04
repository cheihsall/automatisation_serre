import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DonneesModule } from 'src/donnees/donnees.module';
import { DonneesService } from 'src/donnees/donnees.service';
import { UserSchema } from 'src/donnees/entities/donnee.entity';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth.service';
@Module({
  controllers: [AuthController],
  imports: [
    DonneesModule,
    PassportModule,
    JwtModule.register({
      secret: 'cheikh',
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
