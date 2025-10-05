// src/types/catalog/attribute.ts
import type { Paginated } from "@/types/common";

/* ===== Attribute Value ===== */
export interface AttributeValueLite {
  id: number;
  attribute_id: number;
  value: string;
  created_at?: string;
  updated_at?: string;
}

export interface AttributeValue extends AttributeValueLite {
  // show(value) بيرجع load('attribute') حسب الكنترولر
  attribute?: AttributeLite;
}

/* ===== Attribute ===== */
export interface AttributeLite {
  id: number;
  name: string;
  values_count?: number; // index() uses withCount('values')
  created_at?: string;
  updated_at?: string;
}

export interface Attribute extends AttributeLite {
  // show(attribute) بيرجع values[]
  values?: AttributeValueLite[];
}

/* ===== Filters & Payloads ===== */
export interface AttributeFilters {
  search?: string;
  per_page?: number;
  page?: number;
}

export interface AttributeValueFilters {
  search?: string;
}

export interface CreateAttributePayload {
  name: string;
}
export interface UpdateAttributePayload {
  name: string;
}

export interface CreateAttributeValuePayload {
  value: string;
}
export interface UpdateAttributeValuePayload {
  value: string;
}

/* ===== Responses ===== */
export type AttributeIndexResponse = Paginated<AttributeLite>;
export type AttributeShowResponse = Attribute;
export type AttributeStoreResponse = AttributeLite | Attribute;
export type AttributeUpdateResponse = Attribute;
export type AttributeDestroyResponse = null;

export type AttributeValueIndexResponse = AttributeValueLite[]; // controller returns collection (no pagination)
export type AttributeValueShowResponse = AttributeValue;
export type AttributeValueStoreResponse = AttributeValueLite;
export type AttributeValueUpdateResponse = AttributeValueLite;
export type AttributeValueDestroyResponse = null;
