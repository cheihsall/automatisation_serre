import { Test, TestingModule } from '@nestjs/testing';
import { ParametresService } from './parametres.service';

describe('ParametresService', () => {
  let service: ParametresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParametresService],
    }).compile();

    service = module.get<ParametresService>(ParametresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
