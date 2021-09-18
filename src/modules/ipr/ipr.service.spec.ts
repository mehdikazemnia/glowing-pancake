import { Test, TestingModule } from '@nestjs/testing';
import { IprService } from './ipr.service';

describe('IprService', () => {
  let service: IprService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IprService],
    }).compile();

    service = module.get<IprService>(IprService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
