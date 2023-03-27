import { Injectable } from '@nestjs/common';
import { CreateDonneeDto } from './dto/create-donnee.dto';
import { UpdateDonneeDto } from './dto/update-donnee.dto';

@Injectable()
export class DonneesService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_createDonneeDto: CreateDonneeDto) {
    return 'This action adds a new donnee';
  }

  findAll() {
    return `This action returns all donnees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donnee`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateDonneeDto: UpdateDonneeDto) {
    return `This action updates a #${id} donnee`;
  }

  remove(id: number) {
    return `This action removes a #${id} donnee`;
  }
}
