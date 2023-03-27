import { PartialType } from '@nestjs/mapped-types';
import { CreateDonneeDto } from './create-donnee.dto';

export class UpdateDonneeDto extends PartialType(CreateDonneeDto) {}
