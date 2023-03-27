import { Module } from '@nestjs/common';
import { ParametresService } from './parametres.service';
import { ParametresController } from './parametres.controller';
import { Parametres, ParametresSchema } from './entities/parametre.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Parametres.name, schema: ParametresSchema },
    ]),
  ],
  controllers: [ParametresController],
  providers: [ParametresService, RealtimeGateway],
})
export class ParametresModule {}
