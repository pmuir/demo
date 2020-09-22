import { Module } from '@nestjs/common';
import { ProductsOnHandController } from './products-on-hand.controller';
import { ProductsOnHandService } from './products-on-hand.service';

@Module({
  controllers: [ProductsOnHandController],
  providers: [ProductsOnHandService]
})
export class ProductsOnHandModule {}
