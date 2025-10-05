// src/types/catalog/category.ts
import type { Paginated } from "@/types/common";

export interface AttributeLite {
  id: number;
  name: string;
}

export interface ProductLite {
  id: number;
  name: string;
  slug?: string | null;
}

export interface CategoryLite {
  id: number;
  name: string;
  parent_id: number | null;
  description?: string | null;
  image?: string | null;
  image_url?: string | null;
  children_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category extends CategoryLite {
  parent?: CategoryLite | null;
  children?: CategoryLite[];
  attributes?: AttributeLite[];
  products?: ProductLite[];
}

export interface CategoryTreeNode {
  id: number;
  name: string;
  parent_id: number | null;
  image?: string | null;
  image_url?: string | null;
  children?: CategoryTreeNode[];
}

export interface CategoryFilters {
  search?: string;
  parent_id?: number;
  per_page?: number;
  page?: number;
}

export interface CreateCategoryPayload {
  name: string;
  parent_id?: number | null;
  description?: string | null;
  image?: File | null;
}

export interface UpdateCategoryPayload {
  name?: string;
  parent_id?: number | null;
  description?: string | null;
  image?: File | null;
}

export interface SyncCategoryAttributesPayload {
  attributes: number[];
}

export type CategoryIndexResponse = Paginated<CategoryLite>;
export type CategoryTreeResponse = CategoryTreeNode[];
export type CategoryShowResponse = Category;
export type CategoryStoreResponse = CategoryLite | Category;
export type CategoryUpdateResponse = Category;
export type CategoryDestroyResponse = null;
export type CategorySyncAttrsResponse = Category;
