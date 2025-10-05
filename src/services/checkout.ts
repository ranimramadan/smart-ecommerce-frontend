// src/services/checkout.ts
import { ENDPOINTS } from "@/config/endpoints";
import type {
  PlaceOrderPayload,
  PlaceOrderResponse,
  UpdateOrderAddressesPayload,
  UpdateOrderAddressesResponse,
} from "@/types/checkout";

function sessionHeaders() {
  // إذا كنتِ بتخزّني X-Session-Id للضيف بالـ localStorage
  const sid = (typeof window !== "undefined" && localStorage.getItem("X-Session-Id")) || "";
  return sid ? { "X-Session-Id": sid } : {};
}

async function handleGuestSessionExposure(res: Response) {
  // لو السيرفر رجّع X-Session-Id (ضيف جديد)، خزّنيه
  const sid = res.headers.get("X-Session-Id");
  if (sid && typeof window !== "undefined") {
    localStorage.setItem("X-Session-Id", sid);
  }
}

export const CheckoutService = {
  async placeOrder(
    cartId: number | string,
    payload: PlaceOrderPayload
  ): Promise<PlaceOrderResponse> {
    const res = await fetch(ENDPOINTS.CHECKOUT.placeOrder(cartId), {
      method: "POST",
      credentials: "include", // Sanctum
      headers: {
        ...sessionHeaders(),
      },
      body: (() => {
        // لأن الباك يتوقع مصفوفات/حقول متداخلة من فورم داتا (خصوصاً لو مستقبلاً تدفعي ملفات)
        const fd = new FormData();
        if (payload.payment_provider_id != null)
          fd.append("payment_provider_id", String(payload.payment_provider_id));
        if (payload.billing_same_as_shipping != null)
          fd.append("billing_same_as_shipping", payload.billing_same_as_shipping ? "1" : "0");

        // shipping.*
        Object.entries(payload.shipping).forEach(([k, v]) => {
          if (v !== undefined && v !== null) fd.append(`shipping.${k}`, String(v));
        });

        // billing.* (فقط إذا مو same_as_shipping)
        if (!payload.billing_same_as_shipping && payload.billing) {
          Object.entries(payload.billing).forEach(([k, v]) => {
            if (v !== undefined && v !== null) fd.append(`billing.${k}`, String(v));
          });
        }
        return fd;
      })(),
    });

    await handleGuestSessionExposure(res);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw err || { message: "Failed to place order" };
    }
    return res.json();
  },

  async updateAddresses(
    orderId: number | string,
    payload: UpdateOrderAddressesPayload
  ): Promise<UpdateOrderAddressesResponse> {
    const res = await fetch(ENDPOINTS.CHECKOUT.updateAddresses(orderId), {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...sessionHeaders(),
      },
      body: JSON.stringify(payload),
    });

    await handleGuestSessionExposure(res);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw err || { message: "Failed to update addresses" };
    }
    return res.json();
  },
};
