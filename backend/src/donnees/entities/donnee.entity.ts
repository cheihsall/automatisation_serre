import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  prenom: string;
  @Prop()
  nom: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  idcarte: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
