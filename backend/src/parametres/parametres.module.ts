import { Module } from '@nestjs/common';
import { ParametresService } from './parametres.service';
import { ParametresController } from './parametres.controller';
import { Parametres, ParametresSchema } from './entities/parametre.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';
import { ArrosageModule } from 'src/arrosage/arrosage.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Parametres.name, schema: ParametresSchema },
    ]),
    ArrosageModule,
  ],
  controllers: [ParametresController],
  providers: [ParametresService, RealtimeGateway],
  exports: [ParametresService],
})
export class ParametresModule {}
