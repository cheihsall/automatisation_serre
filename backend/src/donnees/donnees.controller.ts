//import { donnee } from './../../../frontend/src/app/test';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { DonneesService } from './donnees.service';
import { CreateDonneeDto } from './dto/create-donnee.dto';
import { UpdateDonneeDto } from './dto/update-donnee.dto';

@UseGuards(JwtAuthGuard)
@Controller('donnees')
export class DonneesController {
  constructor(private readonly donneesService: DonneesService) {}

  @Post('/p')
  create(@Body() createDonneeDto: CreateDonneeDto) {
    return this.donneesService.create(createDonneeDto);
  }

  @Get('/g')
  findAll() {
    return this.donneesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donneesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Body() updateDonneeDto: UpdateDonneeDto, @Param('id') id: string) {
  //  return this.donneesService.update(updateDonneeDto, id);
  //}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonneeDto: UpdateDonneeDto) {
    return this.donneesService.update(id, updateDonneeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donneesService.remove(+id);
  }
}
