import { Test, TestingModule } from '@nestjs/testing';
import { IprController } from './ipr.controller';
import { IprService } from './ipr.service';

describe('IprController', () => {
  let controller: IprController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IprController],
      providers: [IprService],
    }).compile();

    controller = module.get<IprController>(IprController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
