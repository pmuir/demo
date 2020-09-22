import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "../orders/order.entity";
import { ProductsOnHand } from "../products-on-hand/products-on-hand.entity";

@Entity("products", { schema: "inventory" })
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 512 })
  description: string | null;

  @Column("float", { name: "weight", nullable: true, precision: 12 })
  weight: number | null;

  @OneToMany(() => Order, (orders) => orders.product)
  orders: Order[];

  @OneToOne(() => ProductsOnHand, (productsOnHand) => productsOnHand.product)
  productsOnHand: ProductsOnHand;
}
