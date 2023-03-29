import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonneesModule } from './donnees/donnees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ParametresModule } from './parametres/parametres.module';

import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { DonneesService } from './donnees/donnees.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://papa:2605@cluster0.wepa2rr.mongodb.net/homestead?retryWrites=true&w=majority',
    ),
    DonneesModule,
    ParametresModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
