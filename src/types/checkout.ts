// src/types/checkout.ts
import type { Paginated } from "@/types/common";

/* عناوين الشحن/الفوترة المرسلة من الواجهة */
export interface AddressPayload {
  first_name: string;
  last_name: string;
  country: string;   // ISO-2
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  address1: string;
  address2?: string | null;
  phone?: string | null;
  email?: string | null;
}

/* طلب إنشاء الأوردر */
export interface PlaceOrderPayload {
  payment_provider_id?: number | null;
  billing_same_as_shipping?: boolean;
  shipping: AddressPayload;
  billing?: AddressPayload | null; // يُهمل إذا billing_same_as_shipping=true
}

/* تحديث عناوين أثناء المعالجة */
export interface UpdateOrderAddressesPayload {
  same_as_shipping?: boolean;
  shipping: AddressPayload;
  billing?: AddressPayload | null;
}

/* بما إن هيكلة Order ممكن تكون كبيرة وموجودة بأنواع ثانية، نخليها any لتجنب كسر التوافق الآن */
export type CheckoutOrder = any;

/* بدء دفع أونلاين: السيرفر ممكن يرجّع redirect_url أو توكن SDK الخ.. */
export interface PaymentStartPayload {
  provider?: string | null;
  redirect_url?: string | null;
  sdk_token?: string | null;
  meta?: Record<string, any>;
}

/* استجابة إنشاء الطلب */
export interface PlaceOrderResponse {
  order: CheckoutOrder;
  payment: PaymentStartPayload | null; // null لو COD
}

/* استجابة تحديث العناوين */
export type UpdateOrderAddressesResponse = CheckoutOrder;
