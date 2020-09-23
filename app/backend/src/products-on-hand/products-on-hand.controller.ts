import {Controller, MiddlewareConsumer} from '@nestjs/common';
import {ApiCastAuthorizationMiddleware} from "../middlewares/apiCastAuthorization.middleware";

@Controller('products-on-hand')
export class ProductsOnHandController {

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ApiCastAuthorizationMiddleware)
            .forRoutes(ProductsOnHandController);
    }

}
