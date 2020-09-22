import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../products/product.entity";
import {DeleteResult, Repository} from "typeorm";
import {CreateProductDto} from "../products/product.dto";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    public async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }


    public async findById(id: number): Promise<Product | null> {
        return await this.productRepository.findOneOrFail(id);
    }

    public async create(value: CreateProductDto): Promise<Product> {
        return await this.productRepository.save(value);
    }

    public async update(
        id: number,
        newValue: CreateProductDto,
    ): Promise<Product | null> {
        const value = await this.productRepository.findOneOrFail(id);
        if (!value.id) {
            // tslint:disable-next-line:no-console
            console.error("Product doesn't exist");
        }
        await this.productRepository.update(id, newValue);
        return await this.productRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }

}
