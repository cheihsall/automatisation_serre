import { Test, TestingModule } from '@nestjs/testing';
import { ArrosageService } from './arrosage.service';

describe('ArrosageService', () => {
  let service: ArrosageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArrosageService],
    }).compile();

    service = module.get<ArrosageService>(ArrosageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
