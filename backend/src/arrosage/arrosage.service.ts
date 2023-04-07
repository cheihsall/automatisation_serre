import { Injectable } from '@nestjs/common';
import { CreateArrosageDto } from './dto/create-arrosage.dto';
import { UpdateArrosageDto } from './dto/update-arrosage.dto';
import { Model } from 'mongoose';
import { Arrosage, ArrosageDocument } from './entities/arrosage.entity';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ArrosageService {
  constructor(
    @InjectModel(Arrosage.name) private userModel: Model<ArrosageDocument>,
  ) {}
  create(createArrosageDto: CreateArrosageDto) {
    const newArrosage = new this.userModel(createArrosageDto);
    return newArrosage.save();
  }

  findAll() {
    return `This action returns all arrosage`;
  }
  findOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  update(id: string, updateArrosageDto: UpdateArrosageDto) {
    return this.userModel.findByIdAndUpdate(id, updateArrosageDto);
  }

  /* findOne(id: number) {
    return `This action returns a #${id} arrosage`;
  }

  update(id: number, updateArrosageDto: UpdateArrosageDto) {
    return `This action updates a #${id} arrosage`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} arrosage`;
  }
}
