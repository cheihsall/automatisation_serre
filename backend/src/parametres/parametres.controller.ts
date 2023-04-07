import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  Param,
  //Delete,
} from '@nestjs/common';
import { ParametresService } from './parametres.service';
import { CreateParametreDto } from './dto/create-parametre.dto';
//import { UpdateParametreDto } from './dto/update-parametre.dto';

@Controller('parametres')
export class ParametresController {
  constructor(private readonly parametresService: ParametresService) {}

  @Post()
  create(@Body() createParametreDto: CreateParametreDto) {
    return this.parametresService.create(createParametreDto);
  }

  @Get()
  findAll() {
    return this.parametresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parametresService.findOne(id);
  }

  /*  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParametreDto: UpdateParametreDto,
  ) {
    return this.parametresService.update(id, updateParametreDto);
  } */

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parametresService.remove(+id);
  } */
}
