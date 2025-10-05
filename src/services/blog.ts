// src/services/blog.ts
"use client";

import { ENDPOINTS } from "@/config/endpoints";
import  api  from "@/lib/api";

import type {
  // الأساسيات
  BlogPostImage,

  // Public: Posts
  PublicPostsFilters,
  PublicPostsIndexResponse,
  PublicPostShowResponse,

  // Public: Categories & Tags
  PublicCategoriesIndexResponse,
  PublicCategoryShowResponse,
  PublicTagsIndexResponse,
  PublicTagShowResponse,

  // Public: Comments
  PublicCommentsIndexResponse,
  PublicCreateCommentPayload,
  PublicCreateCommentResponse,

  // Public: Media
  PublicPostMediaResponse,

  // Admin: Posts
  AdminPostsFilters,
  AdminPostsIndexResponse,
  AdminCreatePostPayload,
  AdminCreatePostResponse,
  AdminUpdatePostPayload,
  AdminUpdatePostResponse,
  AdminDestroyPostResponse,
  AdminPublishPostResponse,
  AdminUnpublishPostResponse,

  // Admin: Categories
  AdminCategoriesFilters,
  AdminCategoriesIndexResponse,
  AdminCreateCategoryPayload,
  AdminCreateCategoryResponse,
  AdminUpdateCategoryPayload,
  AdminUpdateCategoryResponse,
  AdminDestroyCategoryResponse,

  // Admin: Tags
  AdminTagsFilters,
  AdminTagsIndexResponse,
  AdminCreateTagPayload,
  AdminCreateTagResponse,
  AdminUpdateTagPayload,
  AdminUpdateTagResponse,
  AdminDestroyTagResponse,

  // Admin: Comments
  AdminCommentsIndexResponse,
  AdminCommentsFilters,
  AdminModerateCommentPayload,
  AdminModerateCommentResponse,
  AdminDestroyCommentResponse,

  // Admin: Media
  AdminStoreMediaPayload,
  AdminStoreMediaResponse,
  AdminUpdateMediaPayload,
  AdminUpdateMediaResponse,
  AdminDestroyMediaResponse,
} from "@/types/blog";

/* ================= Utils ================= */

function toFD(payload: Record<string, any>): FormData {
  const fd = new FormData();
  Object.entries(payload || {}).forEach(([k, v]) => {
    if (v === undefined || v === null) return;

    if (v instanceof File) {
      fd.append(k, v);
      return;
    }
    if (Array.isArray(v) && v.length && v[0] instanceof File) {
      (v as File[]).forEach((f) => fd.append(`${k}[]`, f));
      return;
    }

    if (Array.isArray(v) || typeof v === "object") {
      fd.append(k, JSON.stringify(v));
      return;
    }

    fd.append(k, String(v));
  });
  return fd;
}

/* ============== Public ============== */

// Posts
export async function listPublicPosts(
  params: PublicPostsFilters = {}
): Promise<PublicPostsIndexResponse> {
  const { data } = await api.get<PublicPostsIndexResponse>(
    ENDPOINTS.BLOG.public.posts.index,
    { params }
  );
  return data;
}

export async function showPublicPost(
  idOrSlug: number | string
): Promise<PublicPostShowResponse> {
  const { data } = await api.get<PublicPostShowResponse>(
    ENDPOINTS.BLOG.public.posts.show(idOrSlug)
  );
  return data;
}

// Categories
export async function listPublicBlogCategories(): Promise<PublicCategoriesIndexResponse> {
  const { data } = await api.get<PublicCategoriesIndexResponse>(
    ENDPOINTS.BLOG.public.categories.index
  );
  return data;
}

export async function showPublicBlogCategory(
  idOrSlug: number | string
): Promise<PublicCategoryShowResponse> {
  const { data } = await api.get<PublicCategoryShowResponse>(
    ENDPOINTS.BLOG.public.categories.show(idOrSlug)
  );
  return data;
}

// Tags
export async function listPublicBlogTags(): Promise<PublicTagsIndexResponse> {
  const { data } = await api.get<PublicTagsIndexResponse>(
    ENDPOINTS.BLOG.public.tags.index
  );
  return data;
}

export async function showPublicBlogTag(
  idOrSlug: number | string
): Promise<PublicTagShowResponse> {
  const { data } = await api.get<PublicTagShowResponse>(
    ENDPOINTS.BLOG.public.tags.show(idOrSlug)
  );
  return data;
}

// Post comments (published posts)
export async function listPublicPostComments(
  postIdOrSlug: number | string
): Promise<PublicCommentsIndexResponse> {
  const { data } = await api.get<PublicCommentsIndexResponse>(
    ENDPOINTS.BLOG.public.posts.comments.index(postIdOrSlug)
  );
  return data;
}

export async function storePublicPostComment(
  postIdOrSlug: number | string,
  payload: PublicCreateCommentPayload
): Promise<PublicCreateCommentResponse> {
  const { data } = await api.post<PublicCreateCommentResponse>(
    ENDPOINTS.BLOG.public.posts.comments.store(postIdOrSlug),
    payload
  );
  return data;
}

// Post media (published posts)
export async function listPublicPostMedia(
  postIdOrSlug: number | string
): Promise<PublicPostMediaResponse> {
  const { data } = await api.get<PublicPostMediaResponse>(
    ENDPOINTS.BLOG.public.posts.media.index(postIdOrSlug)
  );
  return data;
}

/* ============== Admin: Posts ============== */

export async function adminListPosts(
  params: AdminPostsFilters = {}
): Promise<AdminPostsIndexResponse> {
  const { data } = await api.get<AdminPostsIndexResponse>(
    ENDPOINTS.BLOG.admin.posts.index,
    { params }
  );
  return data;
}

export async function adminStorePost(
  payload: AdminCreatePostPayload
): Promise<AdminCreatePostResponse> {
  const { data } = await api.post<AdminCreatePostResponse>(
    ENDPOINTS.BLOG.admin.posts.store,
    payload
  );
  return data;
}

export async function adminUpdatePost(
  postId: number | string,
  payload: AdminUpdatePostPayload
): Promise<AdminUpdatePostResponse> {
  const { data } = await api.put<AdminUpdatePostResponse>(
    ENDPOINTS.BLOG.admin.posts.update(postId),
    payload
  );
  return data;
}

export async function adminDestroyPost(
  postId: number | string
): Promise<AdminDestroyPostResponse> {
  const { data } = await api.delete<AdminDestroyPostResponse>(
    ENDPOINTS.BLOG.admin.posts.destroy(postId)
  );
  return data;
}

export async function adminPublishPost(
  postId: number | string
): Promise<AdminPublishPostResponse> {
  const { data } = await api.post<AdminPublishPostResponse>(
    ENDPOINTS.BLOG.admin.posts.publish(postId)
  );
  return data;
}

export async function adminUnpublishPost(
  postId: number | string
): Promise<AdminUnpublishPostResponse> {
  const { data } = await api.post<AdminUnpublishPostResponse>(
    ENDPOINTS.BLOG.admin.posts.unpublish(postId)
  );
  return data;
}

/* ============== Admin: Categories ============== */

export async function adminListCategories(
  params: AdminCategoriesFilters = {}
): Promise<AdminCategoriesIndexResponse> {
  const { data } = await api.get<AdminCategoriesIndexResponse>(
    ENDPOINTS.BLOG.admin.categories.index,
    { params }
  );
  return data;
}

export async function adminStoreCategory(
  payload: AdminCreateCategoryPayload
): Promise<AdminCreateCategoryResponse> {
  const { data } = await api.post<AdminCreateCategoryResponse>(
    ENDPOINTS.BLOG.admin.categories.store,
    payload
  );
  return data;
}

export async function adminUpdateCategory(
  id: number | string,
  payload: AdminUpdateCategoryPayload
): Promise<AdminUpdateCategoryResponse> {
  const { data } = await api.put<AdminUpdateCategoryResponse>(
    ENDPOINTS.BLOG.admin.categories.update(id),
    payload
  );
  return data;
}

export async function adminDestroyCategory(
  id: number | string
): Promise<AdminDestroyCategoryResponse> {
  const { data } = await api.delete<AdminDestroyCategoryResponse>(
    ENDPOINTS.BLOG.admin.categories.destroy(id)
  );
  return data;
}

/* ============== Admin: Tags ============== */

export async function adminListTags(
  params: AdminTagsFilters = {}
): Promise<AdminTagsIndexResponse> {
  const { data } = await api.get<AdminTagsIndexResponse>(
    ENDPOINTS.BLOG.admin.tags.index,
    { params }
  );
  return data;
}

export async function adminStoreTag(
  payload: AdminCreateTagPayload
): Promise<AdminCreateTagResponse> {
  const { data } = await api.post<AdminCreateTagResponse>(
    ENDPOINTS.BLOG.admin.tags.store,
    payload
  );
  return data;
}

export async function adminUpdateTag(
  id: number | string,
  payload: AdminUpdateTagPayload
): Promise<AdminUpdateTagResponse> {
  const { data } = await api.put<AdminUpdateTagResponse>(
    ENDPOINTS.BLOG.admin.tags.update(id),
    payload
  );
  return data;
}

export async function adminDestroyTag(
  id: number | string
): Promise<AdminDestroyTagResponse> {
  const { data } = await api.delete<AdminDestroyTagResponse>(
    ENDPOINTS.BLOG.admin.tags.destroy(id)
  );
  return data;
}

/* ============== Admin: Comments ============== */

export async function adminListComments(
  params: AdminCommentsFilters = {}
): Promise<AdminCommentsIndexResponse> {
  const { data } = await api.get<AdminCommentsIndexResponse>(
    ENDPOINTS.BLOG.admin.comments.index,
    { params }
  );
  return data;
}

export async function adminModerateComment(
  commentId: number | string,
  payload: AdminModerateCommentPayload
): Promise<AdminModerateCommentResponse> {
  const { data } = await api.put<AdminModerateCommentResponse>(
    ENDPOINTS.BLOG.admin.comments.moderate(commentId),
    payload
  );
  return data;
}

export async function adminDestroyComment(
  commentId: number | string
): Promise<AdminDestroyCommentResponse> {
  const { data } = await api.delete<AdminDestroyCommentResponse>(
    ENDPOINTS.BLOG.admin.comments.destroy(commentId)
  );
  return data;
}

/* ============== Admin: Media ============== */

export async function adminListPostMedia(
  postId: number | string
): Promise<BlogPostImage[]> {
  const { data } = await api.get<BlogPostImage[]>(
    ENDPOINTS.BLOG.admin.media.index(postId)
  );
  return data;
}

export async function adminStorePostMedia(
  postId: number | string,
  payload: AdminStoreMediaPayload
): Promise<AdminStoreMediaResponse> {
  const fd = toFD(payload as any);
  const { data } = await api.post<AdminStoreMediaResponse>(
    ENDPOINTS.BLOG.admin.media.store(postId),
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

export async function adminUpdatePostMedia(
  imageId: number | string,
  payload: AdminUpdateMediaPayload
): Promise<AdminUpdateMediaResponse> {
  const { data } = await api.put<AdminUpdateMediaResponse>(
    ENDPOINTS.BLOG.admin.media.update(imageId),
    payload
  );
  return data;
}

export async function adminDestroyPostMedia(
  imageId: number | string
): Promise<AdminDestroyMediaResponse> {
  const { data } = await api.delete<AdminDestroyMediaResponse>(
    ENDPOINTS.BLOG.admin.media.destroy(imageId)
  );
  return data;
}
