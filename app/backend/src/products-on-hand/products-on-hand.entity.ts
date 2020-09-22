import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Product } from "../products/product.entity";

@Entity("products_on_hand", { schema: "inventory" })
export class ProductsOnHand {
  @Column("int", { primary: true, name: "product_id" })
  productId: number;

  @Column("int", { name: "quantity" })
  quantity: number;

  @OneToOne(() => Product, (products) => products.productsOnHand, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;
}
