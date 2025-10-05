// أنواع مشتركة (shared/common) تُستخدم بكل الدومينات

export type Id = number | string;
export type Slug = string;

export type ISODate = string;    // "2025-09-20T12:34:56Z"
export type LocalDate = string;  // "2025-09-20"

export interface Timestamps {
  created_at?: ISODate | null;
  updated_at?: ISODate | null;
  deleted_at?: ISODate | null;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface Paginated<T> {
  data: T[];
  meta?: {
    pagination?: Pagination;
    [k: string]: any;
  };
}

export type SortOrder = "asc" | "desc";
export type Sort<TField extends string = string> = Partial<Record<TField, SortOrder>>;

export interface DateRange {
  from?: LocalDate | ISODate;
  to?: LocalDate | ISODate;
}

export interface PriceRange {
  min?: number;
  max?: number;
}

export interface ApiError {
  success?: false;
  message?: string;
  errors?: Record<string, string[]>;
}



// // src/types/shared.ts

// /** صفحة/تقسيم قياسي من Laravel */
// export interface PaginationMeta {
//   current_page: number;
//   from: number | null;
//   last_page: number;
//   path: string;
//   per_page: number;
//   to: number | null;
//   total: number;
// }

// export interface PaginationLinks {
//   first?: string | null;
//   last?: string | null;
//   prev?: string | null;
//   next?: string | null;
// }

// export interface Paginated<T> {
//   data: T[];
//   meta?: PaginationMeta;    // لو تستخدم Laravel Resource
//   links?: PaginationLinks;  // لو تستخدم Laravel Resource
//   // في حال paginate() الخام بدون Resource:
//   current_page?: number;
//   per_page?: number;
//   total?: number;
//   last_page?: number;
// }
// // src/types/shared.ts
// export interface PaginationMeta {
//   current_page: number;
//   from: number | null;
//   last_page: number;
//   path: string;
//   per_page: number;
//   to: number | null;
//   total: number;
// }
// export interface PaginationLinks {
//   first?: string | null;
//   last?: string | null;
//   prev?: string | null;
//   next?: string | null;
// }
// export interface Paginated<T> {
//   data: T[];
//   meta?: PaginationMeta;
//   links?: PaginationLinks;
//   current_page?: number;
//   per_page?: number;
//   total?: number;
//   last_page?: number;
// }
