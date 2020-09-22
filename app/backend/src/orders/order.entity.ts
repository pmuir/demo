import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "../customers/customer.entity";
import { Product } from "../products/product.entity";

@Index("order_customer", ["purchaser"], {})
@Index("ordered_product", ["productId"], {})
@Entity("orders", { schema: "inventory" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "order_number" })
  orderNumber: number;

  @Column("date", { name: "order_date" })
  orderDate: string;

  @Column("int", { name: "purchaser" })
  purchaser: number;

  @Column("int", { name: "quantity" })
  quantity: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @ManyToOne(() => Customer, (customers) => customers.orders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "purchaser", referencedColumnName: "id" }])
  purchaser2: Customer;

  @ManyToOne(() => Product, (products) => products.orders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;
}
