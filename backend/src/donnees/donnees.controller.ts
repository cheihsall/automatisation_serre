import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DonneesService } from './donnees.service';
import { CreateDonneeDto } from './dto/create-donnee.dto';
import { UpdateDonneeDto } from './dto/update-donnee.dto';

@Controller('donnees')
export class DonneesController {
  constructor(private readonly donneesService: DonneesService) {}

  @Post()
  create(@Body() createDonneeDto: CreateDonneeDto) {
    return this.donneesService.create(createDonneeDto);
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
  update( @Body() updateDonneeDto: UpdateDonneeDto, @Param('id') id: string) {
   return  this.donneesService.update(updateDonneeDto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donneesService.remove(+id);
  }
}
