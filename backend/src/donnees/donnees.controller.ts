//mport { donnee } from './../../../frontend/src/app/test2';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { from } from 'rxjs';
import { DonneesService } from './donnees.service';
import { CreateDonneeDto } from './dto/create-donnee.dto';
import { UpdateDonneeDto } from './dto/update-donnee.dto';

@Controller('donnees')
export class DonneesController {
  constructor(private readonly donneesService: DonneesService) {}

  /* @Post()
  create(@Body() createDonneeDto: CreateDonneeDto) {
    return this.donneesService.create(createDonneeDto);
  } */
  /*  @Post('create')
  async create(
    @Body()
    createDonneeDto: CreateDonneeDto,
  ): Promise<{ donnee: any }> {
    return this.donneesService.create(donnee);
  } */

  @Post('create')
  createdonnee(@Body() createDonneeDto: CreateDonneeDto) {
    return this.donneesService.create(createDonneeDto);
    console.log(createDonneeDto);
  }

  @Get()
  findAll() {
    return this.donneesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donneesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonneeDto: UpdateDonneeDto) {
    return this.donneesService.update(+id, updateDonneeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donneesService.remove(+id);
  }
}
