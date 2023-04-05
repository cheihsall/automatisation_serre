import { Injectable } from '@nestjs/common';
import { Parametres, ParametresDocument } from './entities/parametre.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateParametreDto } from 'src/parametres/dto/create-parametre.dto';

@Injectable()
export class ParametresService {
  //insertion bdd
  constructor(
    @InjectModel(Parametres.name)
    private ParametresSchema: Model<ParametresDocument>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async handleConnection() {}

  create(createparametreDto: CreateParametreDto) {
    const createdparam = new this.ParametresSchema(createparametreDto);
    return createdparam.save();
  }

  findAll() {
    return this.ParametresSchema.find().exec();
  }

  findOne(id: string) {
    return this.ParametresSchema.findById(id).exec();
  }
}
