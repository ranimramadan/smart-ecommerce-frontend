// src/types/blog.ts
import type { Paginated } from "@/types/common";

/* ============ الأساسيات ============ */
export type BlogStatus = "draft" | "published" | "archived";
export type CommentStatus = "pending" | "approved" | "rejected";

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  posts_count?: number;
  published_posts_count?: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  posts_count?: number;
}

export interface BlogPostImage {
  id: number;
  post_id: number;
  path: string;
  alt?: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  url?: string | null; // إن رجّع السيرفر URL كامل
}

export interface BlogPostLite {
  id: number;
  title: string;
  slug: string;
  status: BlogStatus;
  category_id?: number | null;
  published_at?: string | null;
  excerpt?: string | null;
}

export interface BlogPost extends BlogPostLite {
  content?: string | null;
  category?: Pick<BlogCategory, "id" | "name" | "slug"> | null;
  tags?: Pick<BlogTag, "id" | "name" | "slug">[];
  images?: BlogPostImage[];
  created_at?: string;
  updated_at?: string;
}

export interface BlogComment {
  id: number;
  post_id: number;
  user_id?: number | null;
  author_name?: string | null;
  author_email?: string | null;
  body: string;
  status: CommentStatus;
  created_at?: string;
  updated_at?: string;
  post?: Pick<BlogPost, "id" | "title" | "slug">;
}

/* ============ Public payloads/filters ============ */
// Posts
export interface PublicPostsFilters {
  q?: string;
  category?: string | number; // slug أو id
  tag?: string | number;       // slug أو id
  from?: string;               // YYYY-MM-DD
  to?: string;                 // YYYY-MM-DD
  page?: number;
  per_page?: number;
}
export type PublicPostsIndexResponse = Paginated<BlogPost>;

// Single post
export type PublicPostShowResponse = BlogPost;

// Categories
export type PublicCategoriesIndexResponse = BlogCategory[];
export type PublicCategoryShowResponse = BlogCategory;

// Tags
export type PublicTagsIndexResponse = (Pick<BlogTag,"id"|"name"|"slug"> & { posts_count: number })[];
export type PublicTagShowResponse = (Pick<BlogTag,"id"|"name"|"slug"> & { posts_count?: number });

// Comments (public)
export type PublicCommentsIndexResponse = Paginated<BlogComment>;
export interface PublicCreateCommentPayload {
  body: string;
  author_name?: string | null;
  author_email?: string | null;
}
export type PublicCreateCommentResponse = BlogComment;

// Media (public)
export type PublicPostMediaResponse = BlogPostImage[];

/* ============ Admin payloads/filters ============ */
// Posts
export interface AdminPostsFilters {
  q?: string;
  status?: BlogStatus;
  category_id?: number;
  page?: number;
  per_page?: number;
}
export type AdminPostsIndexResponse = Paginated<BlogPost>;

export interface AdminCreatePostPayload {
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  status?: BlogStatus; // default draft
  category_id?: number | null;
  published_at?: string | null; // ISO
  tag_ids?: number[];
}
export type AdminCreatePostResponse = BlogPost;

export interface AdminUpdatePostPayload {
  title?: string;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  status?: BlogStatus;
  category_id?: number | null;
  published_at?: string | null;
  tag_ids?: number[]; // تمريرها يبدّل الربط
}
export type AdminUpdatePostResponse = BlogPost;

export type AdminDestroyPostResponse = null;
export type AdminPublishPostResponse = BlogPost;
export type AdminUnpublishPostResponse = BlogPost;

// Categories (admin)
export interface AdminCategoriesFilters {
  q?: string;
  page?: number;
  per_page?: number;
}
export type AdminCategoriesIndexResponse = Paginated<BlogCategory>;
export interface AdminCreateCategoryPayload {
  name: string;
  slug?: string | null;
  description?: string | null;
}
export type AdminCreateCategoryResponse = BlogCategory;
export interface AdminUpdateCategoryPayload {
  name?: string;
  slug?: string | null;
  description?: string | null;
}
export type AdminUpdateCategoryResponse = BlogCategory;
export type AdminDestroyCategoryResponse = null;

// Tags (admin)
export interface AdminTagsFilters {
  q?: string;
  page?: number;
  per_page?: number;
}
export type AdminTagsIndexResponse = Paginated<BlogTag>;
export interface AdminCreateTagPayload {
  name: string;
  slug?: string | null;
}
export type AdminCreateTagResponse = BlogTag;
export interface AdminUpdateTagPayload {
  name?: string;
  slug?: string | null;
}
export type AdminUpdateTagResponse = BlogTag;
export type AdminDestroyTagResponse = null;

// Comments (admin)
export interface AdminCommentsFilters {
  status?: CommentStatus;
  post_id?: number;
  page?: number;
  per_page?: number;
}
export type AdminCommentsIndexResponse = Paginated<BlogComment>;
export interface AdminModerateCommentPayload {
  status: CommentStatus; // approved | rejected | pending
}
export type AdminModerateCommentResponse = BlogComment;
export type AdminDestroyCommentResponse = null;

// Media (admin)
export interface AdminStoreMediaPayload {
  file: File;             // الصورة
  alt?: string | null;
  sort_order?: number | null;
}
export type AdminStoreMediaResponse = BlogPostImage;
export interface AdminUpdateMediaPayload {
  alt?: string | null;
  sort_order?: number | null;
}
export type AdminUpdateMediaResponse = BlogPostImage;
export type AdminDestroyMediaResponse = null;
