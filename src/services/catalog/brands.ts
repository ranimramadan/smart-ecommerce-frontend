// src/services/catalog/brands.ts
import api from "@/lib/api";
import { ENDPOINTS } from "@/config/endpoints";
import type {
  BrandFilters,
  BrandIndexResponse,
  BrandShowResponse,
  CreateBrandPayload,
  UpdateBrandPayload,
  BrandStoreResponse,
  BrandUpdateResponse,
  BrandDestroyResponse,
} from "@/types/catalog/brand";

/* ========= Helpers ========= */
function toFormData(payload: CreateBrandPayload | UpdateBrandPayload): FormData {
  const fd = new FormData();
  if ("name" in payload && payload.name !== undefined) fd.append("name", payload.name);
  if (payload.slug !== undefined && payload.slug !== null) fd.append("slug", payload.slug);
  if (payload.logo instanceof File) fd.append("logo", payload.logo);
  return fd;
}

/* ========= Public ========= */
export async function listBrands(params?: BrandFilters): Promise<BrandIndexResponse> {
  const { data } = await api.get(ENDPOINTS.CATALOG.brands.index, { params });
  return data;
}

export async function showBrand(id: number | string): Promise<BrandShowResponse> {
  const { data } = await api.get(ENDPOINTS.CATALOG.brands.show(id));
  return data;
}

/* ========= Admin ========= */
export async function createBrand(payload: CreateBrandPayload): Promise<BrandStoreResponse> {
  const fd = toFormData(payload);
  const { data } = await api.post(ENDPOINTS.CATALOG_ADMIN.brands.store, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateBrand(
  id: number | string,
  payload: UpdateBrandPayload
): Promise<BrandUpdateResponse> {
  const fd = toFormData(payload);
  const { data } = await api.post(ENDPOINTS.CATALOG_ADMIN.brands.update(id), fd, {
    headers: { "Content-Type": "multipart/form-data" },
    params: { _method: "PUT" }, // مراعاةً لرفع ملفات مع PUT
  });
  return data;
}

export async function deleteBrand(id: number | string): Promise<BrandDestroyResponse> {
  const { data } = await api.delete(ENDPOINTS.CATALOG_ADMIN.brands.destroy(id));
  return data;
}
