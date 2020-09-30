import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AddressesModule} from './addresses/addresses.module';
import {CustomersModule} from './customers/customers.module';
import {OrdersModule} from './orders/orders.module';
import {ProductsModule} from './products/products.module';
import {ProductsOnHandModule} from './products-on-hand/products-on-hand.module';
import {Address} from "./addresses/address.entity";
import {Customer} from "./customers/customer.entity";
import {Order} from "./orders/order.entity";
import {Product} from "./products/product.entity";
import {ProductsOnHand} from "./products-on-hand/products-on-hand.entity";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard} from "nest-keycloak-connect";
import {TerminusModule} from "@nestjs/terminus";
import { HealthController } from './health/health.controller';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

@Module({
    imports: [
        TypeOrmModule.forRoot({
                "name": "default",
                "type": "mysql",
                "host": process.env.DATABASE_HOST || "127.0.0.1",
                "port": parseInt(process.env.DATABASE_PORT) || 5432,
                "username": process.env.DATABASE_USERNAME || "mysql",
                "password": process.env.DATABASE_PASSWORD,
                "database": process.env.DATABASE_NAME || "inventory",
                "synchronize": false,
                "entities": [Address, Customer, Order, Product, ProductsOnHand]
            }
        ),
        KeycloakConnectModule.register({
            authServerUrl: process.env.KEYCLOAK_URL,
            realm: process.env.KEYCLOAK_REALM || 'basic',
            clientId: clientId,
            secret: clientSecret,
        }),
        TerminusModule,
        AddressesModule, CustomersModule, OrdersModule, ProductsModule, ProductsOnHandModule],
    controllers: [AppController, HealthController],
    providers: [
        AppService,
        // These are in order, see https://docs.nestjs.com/guards#binding-guards
        // for more information

        // This adds a global level authentication guard, you can also have it scoped
        // if you like.
        //
        // Will return a 401 unauthorized when it is unable to
        // verify the JWT token or Bearer header is missing.
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        // This adds a global level resource guard, which is permissive.
        // Only controllers annotated with @Resource and methods with @Scopes
        // are handled by this guard.
        {
            provide: APP_GUARD,
            useClass: ResourceGuard,
        },
        // This adds a global level role guard, which is permissive.
        // Used by `@Roles` decorator with the optional `@AllowAnyRole` decorator for allowing any
        // specified role passed.
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {

}
