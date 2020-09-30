import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CustomersService} from "./customers.service";
import {CreateCustomerDto} from "./customer.dto";
import {Customer} from "./customer.entity";

@Controller('customers')
export class CustomersController {

    constructor(private customersService: CustomersService) {}


    @Post()
    async create(@Body() createCustomerDto: CreateCustomerDto) {
        return await this.customersService.create(createCustomerDto);
    }

    @Get()
    async findAll(): Promise<Customer[]> {
        return this.customersService.findAll();
    }

    @Delete(':slug')
    async delete(@Param() params) {
        return await this.customersService.delete(params.slug)
    }

    @Put(':slug')
    async update(@Param() params, @Body() createCustomerDto) {
        return await this.customersService.update(params.slug, createCustomerDto);
    }

}
