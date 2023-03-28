// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument, UserSchema } from './entities/donnee.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDonneeDto } from './dto/create-donnee.dto';
import { UpdateDonneeDto } from './dto/update-donnee.dto';

@Injectable()
export class DonneesService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>, // conf post
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(_createDonneeDto: CreateDonneeDto): Promise<User> {
    {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createduser = new this.UserModel(_createDonneeDto);
        return createduser.save();
      } catch (error) {
        throw new HttpException('NOOON dio', HttpStatus.BAD_REQUEST);
      }
    }
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
