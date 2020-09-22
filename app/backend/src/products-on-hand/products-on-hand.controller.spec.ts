import { Test, TestingModule } from '@nestjs/testing';
import { ProductsOnHandController } from './products-on-hand.controller';

describe('ProductsOnHandController', () => {
  let controller: ProductsOnHandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsOnHandController],
    }).compile();

    controller = module.get<ProductsOnHandController>(ProductsOnHandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
