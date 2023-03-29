import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DonneesService } from 'src/donnees/donnees.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User, UserDocument } from 'src/donnees/entities/donnee.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private usersService: DonneesService,
    private jwtService: JwtService,
  ) {}

  /* async validateUser(username: string, pass: string): Promise<any> {
    const user = this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }*/

  async login(loginUser: CreateAuthDto): Promise<{ token: string }> {
    const { email, password } = loginUser;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException({ message: 'nomail' });
    }
    const goodPassword = await bcrypt.compare(password, user.password);
    if (!goodPassword) {
      throw new UnauthorizedException({ message: 'nopass' });
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
