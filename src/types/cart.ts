import type { Id, Timestamps } from "./common";
import type { Product } from "./catalog/product";

export interface CartItem extends Timestamps {
  id: Id;
  product_id: Id;
  qty: number;
  unit_price: number;
  total: number;
  product?: Product;
}

export interface Cart extends Timestamps {
  id?: Id;
  items: CartItem[];
  items_count: number;
  subtotal: number;
  discount_total?: number;
  shipping_total?: number;
  tax_total?: number;
  grand_total: number;
  currency?: string;
}

export type CartResponse = Cart;
