import { Module } from '@nestjs/common';
import { DonneesService } from './donnees.service';
import { DonneesController } from './donnees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/donnee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [DonneesController],
  providers: [DonneesService],
})
export class DonneesModule {}
