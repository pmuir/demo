import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AddressesModule } from './addresses/addresses.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ProductsOnHandModule } from './products-on-hand/products-on-hand.module';
import {Address} from "./addresses/address.entity";
import {Customer} from "./customers/customer.entity";
import {Order} from "./orders/order.entity";
import {Product} from "./products/product.entity";
import {ProductsOnHand} from "./products-on-hand/products-on-hand.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    "name": "default",
    "type": "mysql",
    "host": process.env.DATABASE_HOST || "127.0.0.1",
    "port": parseInt(process.env.DATABASE_PORT) || 5432,
    "username": process.env.DATABASE_USERNAME || "mysql",
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME || "inventory",
    "synchronize": false,
    "entities": [ Address, Customer, Order, Product, ProductsOnHand ]
  }), AddressesModule, CustomersModule, OrdersModule, ProductsModule, ProductsOnHandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
