import { PartialType } from '@nestjs/mapped-types';
import { CreateParametreDto } from './create-parametre.dto';

export class UpdateParametreDto extends PartialType(CreateParametreDto) {}
