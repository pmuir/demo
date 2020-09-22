import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "../customers/customer.entity";

@Index("address_customer", ["customerId"], {})
@Entity("addresses", { schema: "inventory" })
export class Address {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "customer_id" })
  customerId: number;

  @Column("varchar", { name: "street", length: 255 })
  street: string;

  @Column("varchar", { name: "city", length: 255 })
  city: string;

  @Column("varchar", { name: "state", length: 255 })
  state: string;

  @Column("varchar", { name: "zip", length: 255 })
  zip: string;

  @Column("enum", { name: "type", enum: ["SHIPPING", "BILLING", "LIVING"] })
  type: "SHIPPING" | "BILLING" | "LIVING";

  @ManyToOne(() => Customer, (customers) => customers.addresses, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "customer_id", referencedColumnName: "id" }])
  customer: Customer;
}
