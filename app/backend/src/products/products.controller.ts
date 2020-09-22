import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ProductsService} from "../products/products.service";
import {CreateProductDto} from "../products/product.dto";
import {Product} from "../products/product.entity";

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {}

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productsService.create(createProductDto);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Delete(':slug')
    async delete(@Param() params) {
        return await this.productsService.delete(params.slug)
    }

    @Put(':slug')
    async update(@Param() params, @Body() createProductDto) {
        return await this.productsService.update(params.slug, createProductDto);
    }

}
