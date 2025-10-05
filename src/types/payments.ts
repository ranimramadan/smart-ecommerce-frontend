import type { Id, ISODate, Timestamps, Paginated } from "./common";

export type PaymentStatus = "pending" | "authorized" | "captured" | "failed" | "refunded";

export interface Payment extends Timestamps {
  id: Id;
  order_id: Id;
  provider: string;      // "stripe" | "paypal" | ...
  method?: string;       // "card" | "cod" | ...
  amount: number;
  currency?: string;
  status: PaymentStatus;
  paid_at?: ISODate | null;
  reference?: string | null; // provider ref
}

export type PaymentsResponse = Paginated<Payment>;
export type PaymentResponse = Payment;

// للواجهة العامة:
export interface PaymentMethod {
  key: string;       // "stripe", "cod", ...
  title: string;
  enabled: boolean;
}

export type AvailableMethodsResponse = PaymentMethod[];
