import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonneesModule } from './donnees/donnees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ParametresModule } from './parametres/parametres.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
    DonneesModule,
    ParametresModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
