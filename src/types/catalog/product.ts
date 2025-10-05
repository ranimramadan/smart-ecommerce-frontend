// src/types/catalog/product.ts
import type { Paginated } from "@/types/common";

// ——— Lites ———
export interface BrandLite {
  id: number;
  name: string;
  slug?: string | null;
}

export interface CategoryLite {
  id: number;
  name: string;
  parent_id?: number | null;
}

export interface AttributeLite {
  id: number;
  name: string;
}

export interface AttributeValueLite {
  id: number;
  value: string;
  attribute?: AttributeLite; // الكنترولر eager-loads: variants.values.attribute
}

export interface ProductImage {
  id: number;
  image_path: string;
  image_url?: string | null;
  is_main: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

// ——— Specs & Variants ———
export interface ProductSpec {
  id?: number;
  attribute_id: number;
  attribute_value_id?: number | null;
  value_text?: string | null;
  attribute?: AttributeLite;
  value?: AttributeValueLite;
}

export interface ProductVariant {
  id?: number;
  sku: string;
  price?: number | null;
  stock: number;
  is_active: boolean;
  values: AttributeValueLite[]; // attribute_values pivot + attribute
}

// ——— Product ———
export interface ProductLite {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  category_id: number;
  brand_id?: number | null;
  price: number;
  short_description?: string | null;
  long_description?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;

  // relations (قد تأتي مع index/show)
  brand?: BrandLite | null;
  category?: CategoryLite | null;
  images?: ProductImage[];
}

export interface Product extends ProductLite {
  specs?: ProductSpec[];
  variants?: ProductVariant[];
}

// ——— Filters (index) ———
export type ProductSort =
  | "latest"
  | "oldest"
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "name_desc";

export interface ProductFilters {
  q?: string;                 // بحث بالاسم/sku (والvariants.sku)
  brand_id?: number;
  category_id?: number;       // مع شجرة الفئات (subtree)
  price_min?: number;
  price_max?: number;
  in_stock?: boolean;         // أي variant stock > 0
  values?: number[];          // attribute_value_ids
  sort?: ProductSort;
  per_page?: number;
  page?: number;
}

// ——— Payloads ———
export interface VariantInput {
  sku?: string;
  price?: number | null;
  stock?: number;
  is_active?: boolean;
  values?: number[]; // attribute_value_ids
}

export interface SpecInput {
  attribute_id: number;
  attribute_value_id?: number | null;
  value_text?: string | null;
}

export interface CreateProductPayload {
  name: string;
  slug?: string;
  sku?: string | null;
  category_id: number;
  brand_id?: number | null;
  price: number;
  short_description?: string | null;
  long_description?: string | null;
  is_active?: boolean;

  images?: File[];            // multipart: images[]
  specs?: SpecInput[];        // يَفضَل JSON.stringify عند الإرسال
  variants?: VariantInput[];  // يَفضَل JSON.stringify عند الإرسال
}

export interface UpdateProductPayload {
  name?: string;
  slug?: string;
  sku?: string | null;
  category_id?: number;
  brand_id?: number | null;
  price?: number;
  short_description?: string | null;
  long_description?: string | null;
  is_active?: boolean;

  images?: File[];            // صور إضافية تُضاف
  specs?: SpecInput[];        // الكنترولر يستبدل specs لو مُرّرت
  variants?: VariantInput[];  // الكنترولر يعيد إنشاء variants لو مُرّرت
}

// ——— Responses ———
export type ProductIndexResponse = Paginated<Product>;
export type ProductShowResponse = Product;
export type ProductStoreResponse = Product;
export type ProductUpdateResponse = Product;
export type ProductDestroyResponse = null;

// add/remove images
export type ProductAddImagesResponse = {
  images: ProductImage[];
} | Product; // الكنترولر بيرجع product->load('images')؛ نخليه متسامح
export type ProductRemoveImageResponse = null;
