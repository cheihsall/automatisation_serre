import { PartialType } from '@nestjs/mapped-types';
import { CreateDonneeDto } from './create-donnee.dto';
import { IsNotEmpty } from 'class-validator';
export class UpdateDonneeDto extends PartialType(CreateDonneeDto) {
  @IsNotEmpty({ message: 'Le nouveau mot de passe est requis' })
  newPassword: string;
}