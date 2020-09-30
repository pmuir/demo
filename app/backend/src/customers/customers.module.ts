import {MiddlewareConsumer, Module} from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Customer} from "./customer.entity";
import {ApiCastAuthorizationMiddleware} from "../middlewares/apiCastAuthorization.middleware";
import {LoggerMiddleware} from "../middlewares/logger.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {



}
