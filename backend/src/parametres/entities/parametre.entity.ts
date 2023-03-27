import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ParametresDocument = Parametres & Document;

@Schema()
export class Parametres {
  @Prop()
  temperature: string;
  @Prop()
  humserre: string;
  @Prop()
  humsol: string;
  @Prop()
  luminosite: string;
  @Prop()
  date: string;
  @Prop()
  heure: string;
  static Schema: any;
}

export const ParametresSchema = SchemaFactory.createForClass(Parametres);
