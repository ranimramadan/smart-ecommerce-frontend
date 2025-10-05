// src/types/cart.ts
import type { Paginated } from "@/types/common";

/** عنصر في السلة */
export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  product_variant_id?: number | null;
  qty: number;
  price?: number | null; // إن كان عندك تخزين لسعر العنصر
  created_at?: string;
  updated_at?: string;

  // علاقات مبسّطة (الكونترولر بيرجّع items.product و items.productVariant)
  product?: {
    id: number;
    name: string;
    slug?: string | null;
    // زيد اللي بتحتاجه
  };
  productVariant?: {
    id: number;
    sku: string;
    price?: number | null;
    // زيد اللي بتحتاجه
  };
}

/** نموذج السلة */
export interface Cart {
  id: number;
  user_id?: number | null;
  session_id?: string | null;
  status: "active" | "converted" | "abandoned";
  coupon_id?: number | null;

  subtotal?: number | string | null;
  discount_total?: number | string | null;
  shipping_total?: number | string | null;
  tax_total?: number | string | null;
  grand_total?: number | string | null;

  created_at?: string;
  updated_at?: string;

  items?: CartItem[];
}

/** تجميعة المجاميع */
export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

/** استجابة show/add/update التي ترجع cart + totals (+ رسائل اختيارية) */
export interface CartEnvelope {
  cart: Cart;
  totals: CartTotals;
  message?: "added" | "updated" | "coupon_applied" | "coupon_removed";
  item?: CartItem; // addItem/updateQty بترجّع العنصر
}

/** بايلودات */
export interface AddItemPayload {
  product_id: number;
  product_variant_id?: number | null;
  qty: number;
}

export interface UpdateQtyPayload {
  qty: number;
}

export interface ApplyCouponPayload {
  code: string;
}

/** استجابات بسيطة للعمليات التي لا تعيد السلة */
export interface MessageOnlyResponse {
  message: string; // "removed" | "cleared" ...
}

/** رد show (public) - ممكن تحتاج sessionId من الهيدر */
export type CartShowResponse = CartEnvelope;

/** رد add/update/clear/coupon */
export type CartAddItemResponse = CartEnvelope;
export type CartUpdateQtyResponse = CartEnvelope;
export type CartApplyCouponResponse = CartEnvelope;
export type CartRemoveCouponResponse = CartEnvelope;

export type CartRemoveItemResponse = MessageOnlyResponse;
export type CartClearResponse = MessageOnlyResponse;

/** مساعد لاستخدام X-Session-Id */
export interface SessionAware<T> {
  data: T;
  /** يُعاد فقط لو الخادم أرجع X-Session-Id جديد (ضيف) */
  sessionIdFromServer?: string;
}
