// src/services/catalog/categories.ts
import api from "@/lib/api";
import { ENDPOINTS } from "@/config/endpoints";

import type {
  CategoryIndexResponse,
  CategoryTreeResponse,
  CategoryShowResponse,
  CategoryFilters,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  SyncCategoryAttributesPayload,
  CategoryStoreResponse,
  CategoryUpdateResponse,
  CategoryDestroyResponse,
  CategorySyncAttrsResponse,
} from "@/types/catalog/category";

/** ينظّف الكائن من undefined / null / "" */
function clean<T extends Record<string, any>>(obj: T): Partial<T> {
  const out: Record<string, any> = {};
  Object.entries(obj || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") out[k] = v;
  });
  return out as Partial<T>;
}

/** يحوّل الـ payload إلى FormData (مع دعم الصورة) */
function toFormData(payload: CreateCategoryPayload | UpdateCategoryPayload): FormData {
  const fd = new FormData();
  const data = clean(payload);
  Object.entries(data).forEach(([k, v]) => {
    if (v instanceof File) fd.append(k, v);
    else fd.append(k, String(v));
  });
  return fd;
}

/* =========================
   Public (Catalog)
   ========================= */

/** فهرس الفئات (يدعم parent_id + search + pagination) */
export async function listCategories(
  params: CategoryFilters = {}
): Promise<CategoryIndexResponse> {
  const { data } = await api.get<CategoryIndexResponse>(
    ENDPOINTS.CATALOG.categories.index,
    { params: clean(params) }
  );
  return data;
}

/** شجرة الفئات */
export async function categoriesTree(): Promise<CategoryTreeResponse> {
  const { data } = await api.get<CategoryTreeResponse>(
    ENDPOINTS.CATALOG.categories.tree
  );
  return data;
}

/** عرض فئة */
export async function getCategory(
  id: number | string
): Promise<CategoryShowResponse> {
  const { data } = await api.get<CategoryShowResponse>(
    ENDPOINTS.CATALOG.categories.show(id)
  );
  return data;
}

/* =========================
   Admin (Catalog Management)
   ========================= */

/** إنشاء فئة جديدة (يدعم رفع صورة) */
export async function createCategory(
  payload: CreateCategoryPayload
): Promise<CategoryStoreResponse> {
  const form = toFormData(payload);
  const { data } = await api.post<CategoryStoreResponse>(
    ENDPOINTS.CATALOG_ADMIN.categories.store,
    form
  );
  return data;
}

/** تحديث فئة موجودة (يدعم تغيير الصورة) */
export async function updateCategory(
  id: number | string,
  payload: UpdateCategoryPayload
): Promise<CategoryUpdateResponse> {
  const form = toFormData(payload);
  const { data } = await api.put<CategoryUpdateResponse>(
    ENDPOINTS.CATALOG_ADMIN.categories.update(id),
    form
  );
  return data;
}

/** حذف فئة */
export async function deleteCategory(
  id: number | string
): Promise<CategoryDestroyResponse> {
  const { data } = await api.delete<CategoryDestroyResponse>(
    ENDPOINTS.CATALOG_ADMIN.categories.destroy(id)
  );
  return data;
}

/** مزامنة خصائص الفئة */
export async function syncCategoryAttributes(
  id: number | string,
  payload: SyncCategoryAttributesPayload
): Promise<CategorySyncAttrsResponse> {
  const { data } = await api.post<CategorySyncAttrsResponse>(
    ENDPOINTS.CATALOG_ADMIN.categories.syncAttributes(id),
    payload
  );
  return data;
}
