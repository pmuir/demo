import {MiddlewareConsumer, Module} from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./order.entity";
import {ApiCastAuthorizationMiddleware} from "../middlewares/apiCastAuthorization.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(ApiCastAuthorizationMiddleware)
        .forRoutes(OrdersController);
  }

}
