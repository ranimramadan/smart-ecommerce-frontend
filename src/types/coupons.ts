import type { Id, ISODate, Timestamps, Paginated, PriceRange, DateRange } from "./common";

export type CouponType = "percent" | "fixed";

export interface Coupon extends Timestamps {
  id: Id;
  code: string;
  type: CouponType;
  value: number;            // 10 => 10% or fixed amount (حسب النوع)
  min_cart_total?: number | null;
  max_discount?: number | null;
  usage_limit?: number | null;
  used_count?: number;
  active?: boolean;
  starts_at?: ISODate | null;
  ends_at?: ISODate | null;
}

export type CouponsResponse = Paginated<Coupon>;
export type CouponResponse = Coupon;

// preview على سلة
export interface CouponPreviewRequest {
  code: string;
  cart_id?: Id;
  cart_total?: number;
  price_range?: PriceRange;
  date_range?: DateRange;
}

export interface CouponPreviewResponse {
  valid: boolean;
  discount_amount?: number;
  message?: string;
}
