import { Test, TestingModule } from '@nestjs/testing';
import { ParametresController } from './parametres.controller';
import { ParametresService } from './parametres.service';

describe('ParametresController', () => {
  let controller: ParametresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParametresController],
      providers: [ParametresService],
    }).compile();

    controller = module.get<ParametresController>(ParametresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
