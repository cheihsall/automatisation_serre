/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDonneeDto } from './dto/create-donnee.dto';
import { UpdateDonneeDto } from './dto/update-donnee.dto';
import { User, UserDocument } from './entities/donnee.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserNotFoundException } from './exceptions/userNotFound.exception';
import { IncorrectPasswordException } from './exceptions/IncorrectPasswordException';
@Injectable()
export class DonneesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(_createDonneeDto: CreateDonneeDto) {
    const newUser = new this.userModel(_createDonneeDto);
    const hash = await bcrypt.hash(newUser.password, 10);

    newUser.password = hash;
    return newUser.save();
  }

  findAll() {
    return `This action returns all donnees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donnee`;
  }

  saltOrRounds = 10;
  async update(id: string, updateUserDto: UpdateDonneeDto) {
    const User = await this.userModel.findOne({ email: id });

    if (!User) {
      throw new UserNotFoundException();
    }

    const isPasswordCorrect = await bcrypt.compare(
      updateUserDto.password,
      User.password,
    );
    if (!isPasswordCorrect) {
      throw new IncorrectPasswordException();
    }
    updateUserDto.newPassword = await bcrypt.hash(
      updateUserDto.newPassword,
      this.saltOrRounds,
    );
    const newUser = await this.userModel.findOneAndUpdate(
      { email: id },
      { password: updateUserDto.newPassword },
    );

    if (!newUser) {
      throw new UserNotFoundException();
    }

    return { status: 200, message: 'Mot de passe modifié avec succès' };
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
        throw new UnauthorizedException({ code: "cet email n'existe pas" });
      }
      const goodPassword = await bcrypt.compare(
        createDonneeDto.password,
        user.password,
      );
      if (!goodPassword) {
        throw new UnauthorizedException({ code: 'mot de pass incorrect' });
      }
    } else {
      user = await this.userModel.findOne({
        idcarte: createDonneeDto.idcarte,
      });
      if (!user) {
        throw new UnauthorizedException({
          message: 'nocarte',
          code: 'accés refusé',
        });
      }
    }

    return {
      id: user._id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      password: user.password,
    };
  }
}
