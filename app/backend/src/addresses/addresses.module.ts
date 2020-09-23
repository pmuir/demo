import {MiddlewareConsumer, Module} from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import {ApiCastAuthorizationMiddleware} from "../middlewares/apiCastAuthorization.middleware";

@Module({
  controllers: [AddressesController],
  providers: [AddressesService]
})
export class AddressesModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(ApiCastAuthorizationMiddleware)
        .forRoutes(AddressesController);
  }

}
