import { Module } from '@nestjs/common';
import { ArrosageService } from './arrosage.service';
import { ArrosageController } from './arrosage.controller';
import { Arrosage, UserSchema } from './entities/arrosage.entity';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Arrosage.name, schema: UserSchema }]),
  ],
  controllers: [ArrosageController],
  providers: [ArrosageService],
  exports: [ArrosageService],
})
export class ArrosageModule {}
