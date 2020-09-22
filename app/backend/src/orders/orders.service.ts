import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Order} from "../orders/order.entity";
import {DeleteResult, Repository} from "typeorm";
import {CreateOrderDto} from "../orders/order.dto";

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    public async findAll(): Promise<Order[]> {
        return await this.orderRepository.find();
    }


    public async findById(id: number): Promise<Order | null> {
        return await this.orderRepository.findOneOrFail(id);
    }

    public async create(value: CreateOrderDto): Promise<Order> {
        return await this.orderRepository.save(value);
    }

    public async update(
        id: number,
        newValue: CreateOrderDto,
    ): Promise<Order | null> {
        const value = await this.orderRepository.findOneOrFail(id);
        if (!value.orderNumber) {
            // tslint:disable-next-line:no-console
            console.error("Order doesn't exist");
        }
        await this.orderRepository.update(id, newValue);
        return await this.orderRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.orderRepository.delete(id);
    }

}
