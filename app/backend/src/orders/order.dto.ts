import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty()
    quantity: number;
}
