import { Module } from '@nestjs/common';
import { DonneesService } from './donnees.service';
import { DonneesController } from './donnees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/donnee.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
  ],
  controllers: [DonneesController],
  providers: [DonneesService, JwtModule],
  exports: [DonneesService],
})
export class DonneesModule {}
