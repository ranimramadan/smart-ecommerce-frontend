// src/services/catalog/attributes.ts
import api from "@/lib/api";
import { ENDPOINTS } from "@/config/endpoints";
import type {
  AttributeFilters,
  AttributeIndexResponse,
  AttributeShowResponse,
  CreateAttributePayload,
  UpdateAttributePayload,
  AttributeStoreResponse,
  AttributeUpdateResponse,
  AttributeDestroyResponse,
  AttributeValueFilters,
  AttributeValueIndexResponse,
  AttributeValueShowResponse,
  CreateAttributeValuePayload,
  UpdateAttributeValuePayload,
  AttributeValueStoreResponse,
  AttributeValueUpdateResponse,
  AttributeValueDestroyResponse,
} from "@/types/catalog/attribute";

/* =======================
   Attributes (Public/Admin)
   ======================= */

export async function listAttributes(
  params?: AttributeFilters
): Promise<AttributeIndexResponse> {
  const { data } = await api.get(ENDPOINTS.CATALOG.attributes.index, { params });
  return data;
}

export async function showAttribute(id: number | string): Promise<AttributeShowResponse> {
  const { data } = await api.get(ENDPOINTS.CATALOG.attributes.show(id));
  return data;
}

export async function createAttribute(
  payload: CreateAttributePayload
): Promise<AttributeStoreResponse> {
  const { data } = await api.post(ENDPOINTS.CATALOG_ADMIN.attributes.store, payload);
  return data;
}

export async function updateAttribute(
  id: number | string,
  payload: UpdateAttributePayload
): Promise<AttributeUpdateResponse> {
  const { data } = await api.put(ENDPOINTS.CATALOG_ADMIN.attributes.update(id), payload);
  return data;
}

export async function deleteAttribute(id: number | string): Promise<AttributeDestroyResponse> {
  const { data } = await api.delete(ENDPOINTS.CATALOG_ADMIN.attributes.destroy(id));
  return data;
}

/* ===========================
   Attribute Values (Public/Admin)
   =========================== */

export async function listAttributeValues(
  attributeId: number | string,
  params?: AttributeValueFilters
): Promise<AttributeValueIndexResponse> {
  const { data } = await api.get(ENDPOINTS.CATALOG.attributes.values(attributeId), { params });
  return data;
}

export async function showAttributeValue(valueId: number | string): Promise<AttributeValueShowResponse> {
  const { data } = await api.get(ENDPOINTS.CATALOG.values.show(valueId));
  return data;
}

export async function createAttributeValue(
  attributeId: number | string,
  payload: CreateAttributeValuePayload
): Promise<AttributeValueStoreResponse> {
  const { data } = await api.post(ENDPOINTS.CATALOG_ADMIN.attributes.values.store(attributeId), payload);
  return data;
}

export async function updateAttributeValue(
  valueId: number | string,
  payload: UpdateAttributeValuePayload
): Promise<AttributeValueUpdateResponse> {
  const { data } = await api.put(ENDPOINTS.CATALOG_ADMIN.values.update(valueId), payload);
  return data;
}

export async function deleteAttributeValue(
  valueId: number | string
): Promise<AttributeValueDestroyResponse> {
  const { data } = await api.delete(ENDPOINTS.CATALOG_ADMIN.values.destroy(valueId));
  return data;
}
