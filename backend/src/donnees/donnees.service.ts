import { Injectable ,HttpException,HttpStatus, NotFoundException} from '@nestjs/common';
import { CreateDonneeDto } from './dto/create-donnee.dto';
import { UpdateDonneeDto } from './dto/update-donnee.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/donnee.entity';


@Injectable()
export class DonneesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, 
  ) {}
  
  
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
  async update(_updateDonneeDto: UpdateDonneeDto, id: String){
    try {
      return this.userModel.findOneAndUpdate({_id: id}, _updateDonneeDto)
    
    } catch (error) {
      throw new HttpException('Error updating article', HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} donnee`;
  }
}
