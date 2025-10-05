// src/services/catalog/products.ts
import api from "@/lib/api";
import { ENDPOINTS } from "@/config/endpoints";
import type {
  ProductFilters,
  ProductIndexResponse,
  ProductShowResponse,
  CreateProductPayload,
  UpdateProductPayload,
  ProductStoreResponse,
  ProductUpdateResponse,
  ProductDestroyResponse,
  ProductAddImagesResponse,
  ProductRemoveImageResponse,
} from "@/types/catalog/product";

/** utils */
function toQuery(params: Record<string, any> = {}) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    if (Array.isArray(v)) v.forEach((item) => sp.append(k + "[]", String(item)));
    else sp.append(k, String(v));
  });
  const q = sp.toString();
  return q ? `?${q}` : "";
}

function toFormData(payload: Record<string, any>) {
  const fd = new FormData();
  Object.entries(payload).forEach(([k, v]) => {
    if (v === undefined || v === null) return;

    if (k === "images" && Array.isArray(v)) {
      v.forEach((file: File) => fd.append("images[]", file));
      return;
    }

    // specs/variants في الكنترولر decodeJsonField => يقبل array أو JSON string.
    if (k === "specs" || k === "variants") {
      // نرسل JSON string لنتفادى مشكلات multipart
      fd.append(k, JSON.stringify(v));
      return;
    }

    // الباقي primitives
    fd.append(k, String(v));
  });
  return fd;
}

/** Public listing (with filters/sort/pagination) */
export async function listProducts(filters: ProductFilters = {}) {
  const url = ENDPOINTS.CATALOG.products.index + toQuery(filters as any);
  const { data } = await api.get<ProductIndexResponse>(url);
  return data;
}

/** Public show */
export async function getProduct(productId: number | string) {
  const { data } = await api.get<ProductShowResponse>(
    ENDPOINTS.CATALOG.products.show(productId)
  );
  return data;
}

/** Admin: create product (multipart) */
export async function createProduct(payload: CreateProductPayload) {
  const fd = toFormData(payload as any);
  const { data } = await api.post<ProductStoreResponse>(
    ENDPOINTS.CATALOG_ADMIN.products.store,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

/** Admin: update product (multipart; adds images; may replace specs/variants) */
export async function updateProduct(productId: number | string, payload: UpdateProductPayload) {
  const fd = toFormData(payload as any);
  const { data } = await api.post<ProductUpdateResponse>(
    // لو باكك عاملها PUT، بعض المتصفحات مع multipart بيكون أسهل POST + _method
    ENDPOINTS.CATALOG_ADMIN.products.update(productId),
    fd,
    {
      headers: { "Content-Type": "multipart/form-data" },
      params: { _method: "PUT" },
    }
  );
  return data;
}

/** Admin: destroy product */
export async function destroyProduct(productId: number | string) {
  const { data } = await api.delete<ProductDestroyResponse>(
    ENDPOINTS.CATALOG_ADMIN.products.destroy(productId)
  );
  return data;
}

/** Admin: add images to existing product */
export async function addProductImages(
  productId: number | string,
  files: File[],
  mainIndex?: number
) {
  const fd = new FormData();
  files.forEach((f) => fd.append("images[]", f));
  if (typeof mainIndex === "number") fd.append("main", String(mainIndex));

  const { data } = await api.post<ProductAddImagesResponse>(
    ENDPOINTS.CATALOG_ADMIN.products.addImages(productId),
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

/** Admin: remove one image */
export async function removeProductImage(productId: number | string, imageId: number | string) {
  const { data } = await api.delete<ProductRemoveImageResponse>(
    ENDPOINTS.CATALOG_ADMIN.products.removeImage(productId, imageId)
  );
  return data;
}
