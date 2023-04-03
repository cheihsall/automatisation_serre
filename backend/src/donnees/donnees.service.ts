/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  NotFoundException
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDonneeDto } from './dto/create-donnee.dto';
import { UpdateDonneeDto } from './dto/update-donnee.dto';
import { User, UserDocument } from './entities/donnee.entity';
import * as bcrypt  from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class DonneesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(_createDonneeDto: CreateDonneeDto) {
    const newUser = new this.userModel(_createDonneeDto);
    const hash = await bcrypt.hash(newUser.password, 10);
    //return res.json({ message: "entre" })
    newUser.password = hash;
    return newUser.save();
  }

  findAll() {
    return `This action returns all donnees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donnee`;
  }

  // modification mdp
  async update(updateDonneeDto: UpdateDonneeDto, id: string){
    try {
      return this.userModel.findOneAndUpdate({_id: id}, updateDonneeDto)
    
    } catch (error) {
      throw new HttpException('Error updating article', HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} donnee`;
  }

  async login(createDonneeDto: CreateDonneeDto) {
    let user: any = {};
    if (!createDonneeDto.idcarte) {
      user = await this.userModel.findOne({
        email: createDonneeDto.email,
      });
      if (!user) {
        throw new UnauthorizedException({ message: 'nomail', code: 'nomail' });
        //return { message: 'nomail', code: 'nomail' };
      }
      const goodPassword = await bcrypt.compare(
        createDonneeDto.password,
        user.password,
      );
      if (!goodPassword) {
        throw new UnauthorizedException({ message: 'nopass', code: 'nopass' });
      }
    } else {
      user = await this.userModel.findOne({
        idcarte: createDonneeDto.idcarte,
      });
      if (!user) {
        throw new UnauthorizedException({
          message: 'nocarte',
          code: 'nocarte',
        });
      }
    }

    return {
      id: user._id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
    };
  }
}
