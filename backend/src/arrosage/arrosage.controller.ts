import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArrosageService } from './arrosage.service';
import { CreateArrosageDto } from './dto/create-arrosage.dto';
import { UpdateArrosageDto } from './dto/update-arrosage.dto';

@Controller('arrosage')
export class ArrosageController {
  constructor(private readonly arrosageService: ArrosageService) {}

  @Post()
  create(@Body() createArrosageDto: CreateArrosageDto) {
    return this.arrosageService.create(createArrosageDto);
  }

  @Get()
  findAll() {
    return this.arrosageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arrosageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArrosageDto: UpdateArrosageDto,
  ) {
    return this.arrosageService.update(id, updateArrosageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arrosageService.remove(+id);
  }
}
