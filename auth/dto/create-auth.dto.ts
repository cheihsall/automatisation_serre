import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/donnees/entities/donnee.entity';

export class CreateAuthDto {
  @Prop()
  email: string;
  @Prop()
  password: string;
}
