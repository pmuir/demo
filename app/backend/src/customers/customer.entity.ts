import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "../addresses/address.entity";
import { Order } from "../orders/order.entity";

@Index("email", ["email"], { unique: true })
@Entity("customers", { schema: "inventory" })
export class Customer {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @OneToMany(() => Address, (addresses) => addresses.customer)
  addresses: Address[];

  @OneToMany(() => Order, (orders) => orders.purchaser2)
  orders: Order[];
}
