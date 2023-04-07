import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonneesModule } from './donnees/donnees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ParametresModule } from './parametres/parametres.module';

import { AuthModule } from './auth/auth.module';
import { ArrosageService } from './arrosage/arrosage.service';
import { ArrosageModule } from './arrosage/arrosage.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://fadalba:Thiaroye44@cluster0.9vbufn8.mongodb.net/nestjs',
    ),
    DonneesModule,
    ParametresModule,
    AuthModule,
    ArrosageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
