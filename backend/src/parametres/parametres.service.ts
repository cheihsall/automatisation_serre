import { Injectable } from '@nestjs/common';
import { CreateParametreDto } from './dto/create-parametre.dto';
import { UpdateParametreDto } from './dto/update-parametre.dto';

@Injectable()
export class ParametresService {
  create(createParametreDto: CreateParametreDto) {
    return 'This action adds a new parametre';
  }

  findAll() {
    return `This action returns all parametres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parametre`;
  }

  update(id: number, updateParametreDto: UpdateParametreDto) {
    return `This action updates a #${id} parametre`;
  }

  remove(id: number) {
    return `This action removes a #${id} parametre`;
  }
}
