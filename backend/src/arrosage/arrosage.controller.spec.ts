import { Test, TestingModule } from '@nestjs/testing';
import { ArrosageController } from './arrosage.controller';
import { ArrosageService } from './arrosage.service';

describe('ArrosageController', () => {
  let controller: ArrosageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArrosageController],
      providers: [ArrosageService],
    }).compile();

    controller = module.get<ArrosageController>(ArrosageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
