import {MiddlewareConsumer, Module} from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {ApiCastAuthorizationMiddleware} from "../middlewares/apiCastAuthorization.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(ApiCastAuthorizationMiddleware)
        .forRoutes(ProductsController);
  }

}
