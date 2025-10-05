// src/types/catalog/brand.ts
import type { Paginated } from "@/types/common";

export interface BrandLite {
  id: number;
  name: string;
  slug?: string | null;
  logo?: string | null;      // مسار داخل storage
  logo_url?: string | null;  // إن كنت بتضيفه من الباك كـ accessor
  products_count?: number;   // show() بيرجع loadCount('products')
  created_at?: string;
  updated_at?: string;
}

// حالياً show() بيرجع نفس الـ Lite + products_count، فبنخليها نفس الشيء
export type Brand = BrandLite;

export type BrandSort = "name_asc" | "name_desc";

export interface BrandFilters {
  search?: string;
  sort?: BrandSort;
  per_page?: number;
  page?: number;
}

export interface CreateBrandPayload {
  name: string;
  slug?: string | null;
  logo?: File | null;
}

export interface UpdateBrandPayload {
  name?: string;
  slug?: string | null;
  logo?: File | null;
}

export type BrandIndexResponse = Paginated<BrandLite>;
export type BrandShowResponse = Brand;
export type BrandStoreResponse = Brand;
export type BrandUpdateResponse = Brand;
export type BrandDestroyResponse = null;
