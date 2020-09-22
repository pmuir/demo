import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {OrdersService} from "../orders/orders.service";
import {CreateOrderDto} from "../orders/order.dto";
import {Order} from "../orders/order.entity";

@Controller('orders')
export class OrdersController {

    constructor(private ordersService: OrdersService) {}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        return await this.ordersService.create(createOrderDto);
    }

    @Get()
    async findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Delete(':slug')
    async delete(@Param() params) {
        return await this.ordersService.delete(params.slug)
    }

    @Put(':slug')
    async update(@Param() params, @Body() createOrderDto) {
        return await this.ordersService.update(params.slug, createOrderDto);
    }

}
