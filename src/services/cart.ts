// src/services/cart.ts
import api from "@/lib/api";
import { ENDPOINTS } from "@/config/endpoints";
import type {
  AddItemPayload,
  UpdateQtyPayload,
  ApplyCouponPayload,
  CartShowResponse,
  CartAddItemResponse,
  CartUpdateQtyResponse,
  CartApplyCouponResponse,
  CartRemoveCouponResponse,
  CartRemoveItemResponse,
  CartClearResponse,
  SessionAware,
} from "@/types/cart";

/** التقط X-Session-Id من الهيدر إن وُجد */
function pickSessionIdFromHeaders(headers: Record<string, any>): string | undefined {
  // Axios يجعل أسماء الهيدرز lower-case
  return headers?.["x-session-id"] ?? headers?.get?.("x-session-id");
}

/** عرض/إنشاء السلة (عام — يدعم الضيف عبر X-Session-Id) */
export async function getCart(
  opts?: { sessionId?: string }
): Promise<SessionAware<CartShowResponse>> {
  const res = await api.get<CartShowResponse>(ENDPOINTS.CART.publicShow, {
    // إن عندك sessionId للضيف مرّرو بالهيدر
    headers: opts?.sessionId ? { "X-Session-Id": opts.sessionId } : undefined,
  });
  const sessionIdFromServer = pickSessionIdFromHeaders(res.headers);
  return { data: res.data, sessionIdFromServer };
}

/** (محمّي) إضافة عنصر */
export async function addItem(payload: AddItemPayload): Promise<CartAddItemResponse> {
  const { data } = await api.post<CartAddItemResponse>(ENDPOINTS.CART.auth.addItem, payload);
  return data;
}

/** (محمّي) تعديل كمية عنصر */
export async function updateQty(
  itemId: number | string,
  payload: UpdateQtyPayload
): Promise<CartUpdateQtyResponse> {
  const { data } = await api.put<CartUpdateQtyResponse>(
    ENDPOINTS.CART.auth.updateQty(itemId),
    payload
  );
  return data;
}

/** (محمّي) حذف عنصر */
export async function removeItem(itemId: number | string): Promise<CartRemoveItemResponse> {
  const { data } = await api.delete<CartRemoveItemResponse>(ENDPOINTS.CART.auth.removeItem(itemId));
  return data;
}

/** (محمّي) تفريغ السلة */
export async function clearCart(): Promise<CartClearResponse> {
  const { data } = await api.post<CartClearResponse>(ENDPOINTS.CART.auth.clear);
  return data;
}

/** (محمّي) تطبيق كوبون */
export async function applyCoupon(payload: ApplyCouponPayload): Promise<CartApplyCouponResponse> {
  const { data } = await api.post<CartApplyCouponResponse>(
    ENDPOINTS.CART.auth.coupon.apply,
    payload
  );
  return data;
}

/** (محمّي) إزالة كوبون */
export async function removeCoupon(): Promise<CartRemoveCouponResponse> {
  const { data } = await api.delete<CartRemoveCouponResponse>(ENDPOINTS.CART.auth.coupon.remove);
  return data;
}
