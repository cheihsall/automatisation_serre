import { Test, TestingModule } from '@nestjs/testing';
import { DonneesController } from './donnees.controller';
import { DonneesService } from './donnees.service';

describe('DonneesController', () => {
  let controller: DonneesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonneesController],
      providers: [DonneesService],
    }).compile();

    controller = module.get<DonneesController>(DonneesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
