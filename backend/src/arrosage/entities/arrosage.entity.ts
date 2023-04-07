import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArrosageDocument = Arrosage & Document;

@Schema()
export class Arrosage {
  static save(): Arrosage | PromiseLike<Arrosage> {
    throw new Error('Method not implemented.');
  }
  @Prop()
  plante: string;
  @Prop()
  nombreArrosage: number;
  @Prop()
  dureArrosage: number;
}

export const UserSchema = SchemaFactory.createForClass(Arrosage);
