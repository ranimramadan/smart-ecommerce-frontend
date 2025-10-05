import type { Id, Slug, Timestamps, Paginated } from "./common";

export interface Brand extends Timestamps {
  id: Id;
  name: string;
  slug?: Slug;
  logo_url?: string | null;
  description?: string | null;
}

export interface Category extends Timestamps {
  id: Id;
  name: string;
  slug?: Slug;
  parent_id?: Id | null;
  children?: Category[];
}

export interface Attribute extends Timestamps {
  id: Id;
  name: string;
  code?: string;
  type?: "text" | "select" | "multiselect" | "number" | "boolean";
}

export interface AttributeValue extends Timestamps {
  id: Id;
  attribute_id: Id;
  value: string;
  slug?: Slug;
}

// list responses
export type BrandsResponse = Paginated<Brand>;
export type CategoriesResponse = Paginated<Category>;
export type AttributesResponse = Paginated<Attribute>;
export type AttributeValuesResponse = Paginated<AttributeValue>;
