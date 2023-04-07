import { PartialType } from '@nestjs/mapped-types';
import { CreateArrosageDto } from './create-arrosage.dto';
import { IsNotEmpty } from 'class-validator';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
export class UpdateArrosageDto extends PartialType(CreateArrosageDto) {
  @IsNotEmpty({ message: 'Le nouveau mot de passe est requis' })
  id: string;
  @Prop()
  plante: string;
  @Prop()
  nombreArrosage: number;
  @Prop()
  dureArrosage: number;
}
