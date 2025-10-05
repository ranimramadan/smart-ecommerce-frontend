import type { Id, ISODate, Timestamps, Paginated } from "./common";
import type { CartItem } from "./cart";

export type OrderStatus =
  | "pending" | "processing" | "paid" | "shipped" | "delivered"
  | "cancelled" | "refunded";

export interface Address {
  name?: string | null;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
  phone?: string | null;
}

export interface Order extends Timestamps {
  id: Id;
  user_id?: Id | null;
  number?: string;  // human readable
  status: OrderStatus;
  currency?: string;

  items: (CartItem & { order_item_id?: Id })[];

  subtotal: number;
  discount_total?: number;
  shipping_total?: number;
  tax_total?: number;
  grand_total: number;

  billing_address?: Address;
  shipping_address?: Address;

  placed_at?: ISODate | null;
}

export type OrdersResponse = Paginated<Order>;
export type OrderResponse = Order;
