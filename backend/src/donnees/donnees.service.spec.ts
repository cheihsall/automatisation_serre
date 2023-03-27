import { Test, TestingModule } from '@nestjs/testing';
import { DonneesService } from './donnees.service';

describe('DonneesService', () => {
  let service: DonneesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonneesService],
    }).compile();

    service = module.get<DonneesService>(DonneesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
