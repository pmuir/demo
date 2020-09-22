import { Injectable } from '@nestjs/common';
import {Customer} from "./customer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {CreateCustomerDto} from "./customer.dto";

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    public async findAll(): Promise<Customer[]> {
        return await this.customerRepository.find();
    }


    public async findById(id: number): Promise<Customer | null> {
        return await this.customerRepository.findOneOrFail(id);
    }

    public async create(value: CreateCustomerDto): Promise<Customer> {
        return await this.customerRepository.save(value);
    }

    public async update(
        id: number,
        newValue: CreateCustomerDto,
    ): Promise<Customer | null> {
        const value = await this.customerRepository.findOneOrFail(id);
        if (!value.id) {
            // tslint:disable-next-line:no-console
            console.error("Customer doesn't exist");
        }
        await this.customerRepository.update(id, newValue);
        return await this.customerRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.customerRepository.delete(id);
    }

}
