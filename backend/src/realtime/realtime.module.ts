import { Module } from '@nestjs/common';
import { ArrosageService } from 'src/arrosage/arrosage.service';
import { RealtimeGateway } from './realtime.gateway';
import { ParametresDocument } from 'src/parametres/entities/parametre.entity';
import { Model } from 'mongoose';
import { ParametresService } from 'src/parametres/parametres.service';
import { ArrosageModule } from 'src/arrosage/arrosage.module';
import { ParametresModule } from 'src/parametres/parametres.module';

@Module({
  imports: [ArrosageModule, ParametresModule],
  providers: [RealtimeGateway],
})
export class RealtimeModule {}
