import { Test, TestingModule } from '@nestjs/testing';
import { ProductsOnHandService } from './products-on-hand.service';

describe('ProductsOnHandService', () => {
  let service: ProductsOnHandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsOnHandService],
    }).compile();

    service = module.get<ProductsOnHandService>(ProductsOnHandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
