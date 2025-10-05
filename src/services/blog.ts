// src/services/blog.ts
"use client";

import { ENDPOINTS } from "@/config/endpoints";
import api from "@/lib/api";


// ===== Types =====
import type {
  // Public: Posts
  PublicPostsIndexParams,
  PublicPostsIndexResponse,
  PublicPostShowResponse,

  // Public: Categories & Tags
  PublicCategoriesIndexResponse,
  PublicCategoryShowResponse,
  PublicTagsIndexResponse,
  PublicTagShowResponse,

  // Public: Comments (على بوست منشور)
  PublicCommentsIndexResponse,
  PublicCommentStorePayload,
  PublicCommentStoreResponse,

  // Admin: Posts
  AdminPostsIndexParams,
  AdminPostsIndexResponse,
  AdminPostStorePayload,
  AdminPostStoreResponse,
  AdminPostUpdatePayload,
  AdminPostUpdateResponse,
  AdminPostDestroyResponse,
  AdminPostPublishResponse,
  AdminPostUnpublishResponse,

  // Admin: Categories
  AdminCategoriesIndexParams,
  AdminCategoriesIndexResponse,
  AdminCategoryStorePayload,
  AdminCategoryStoreResponse,
  AdminCategoryUpdatePayload,
  AdminCategoryUpdateResponse,
  AdminCategoryDestroyResponse,

  // Admin: Tags
  AdminTagsIndexParams,
  AdminTagsIndexResponse,
  AdminTagStorePayload,
  AdminTagStoreResponse,
  AdminTagUpdatePayload,
  AdminTagUpdateResponse,
  AdminTagDestroyResponse,

  // Admin: Media
  BlogPostImage,
  AdminStoreMediaPayload,
  AdminStoreMediaResponse,
  AdminUpdateMediaPayload,
  AdminUpdateMediaResponse,
  AdminDestroyMediaResponse,
} from "@/types/blog";

// ============ Utils ============

/** يحوّل أي Record إلى FormData (يدعم File) */
function toFD(payload: Record<string, any>): FormData {
  const fd = new FormData();
  Object.entries(payload || {}).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (v instanceof File) {
      fd.append(k, v);
      return;
    }
    // Array of files
    if (Array.isArray(v) && v.length && v[0] instanceof File) {
      (v as File[]).forEach((f) => fd.append(`${k}[]`, f));
      return;
    }
    // Array/objects -> JSON
    if (Array.isArray(v) || typeof v === "object") {
      fd.append(k, JSON.stringify(v));
      return;
    }
    fd.append(k, String(v));
  });
  return fd;
}

// ============ Public: Posts ============

export async function listPublicPosts(
  params: PublicPostsIndexParams = {}
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

// ============ Public: Categories & Tags ============

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

// ============ Public: Comments ============

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
  payload: PublicCommentStorePayload
): Promise<PublicCommentStoreResponse> {
  const { data } = await api.post<PublicCommentStoreResponse>(
    ENDPOINTS.BLOG.public.posts.comments.store(postIdOrSlug),
    payload
  );
  return data;
}

// ============ Admin: Posts ============

export async function adminListPosts(
  params: AdminPostsIndexParams = {}
): Promise<AdminPostsIndexResponse> {
  const { data } = await api.get<AdminPostsIndexResponse>(
    ENDPOINTS.BLOG.admin.posts.index,
    { params }
  );
  return data;
}

export async function adminStorePost(
  payload: AdminPostStorePayload
): Promise<AdminPostStoreResponse> {
  const { data } = await api.post<AdminPostStoreResponse>(
    ENDPOINTS.BLOG.admin.posts.store,
    payload
  );
  return data;
}

export async function adminUpdatePost(
  postId: number | string,
  payload: AdminPostUpdatePayload
): Promise<AdminPostUpdateResponse> {
  const { data } = await api.put<AdminPostUpdateResponse>(
    ENDPOINTS.BLOG.admin.posts.update(postId),
    payload
  );
  return data;
}

export async function adminDestroyPost(
  postId: number | string
): Promise<AdminPostDestroyResponse> {
  const { data } = await api.delete<AdminPostDestroyResponse>(
    ENDPOINTS.BLOG.admin.posts.destroy(postId)
  );
  return data;
}

export async function adminPublishPost(
  postId: number | string
): Promise<AdminPostPublishResponse> {
  const { data } = await api.post<AdminPostPublishResponse>(
    ENDPOINTS.BLOG.admin.posts.publish(postId)
  );
  return data;
}

export async function adminUnpublishPost(
  postId: number | string
): Promise<AdminPostUnpublishResponse> {
  const { data } = await api.post<AdminPostUnpublishResponse>(
    ENDPOINTS.BLOG.admin.posts.unpublish(postId)
  );
  return data;
}

// ============ Admin: Categories ============

export async function adminListCategories(
  params: AdminCategoriesIndexParams = {}
): Promise<AdminCategoriesIndexResponse> {
  const { data } = await api.get<AdminCategoriesIndexResponse>(
    ENDPOINTS.BLOG.admin.categories.index,
    { params }
  );
  return data;
}

export async function adminStoreCategory(
  payload: AdminCategoryStorePayload
): Promise<AdminCategoryStoreResponse> {
  const { data } = await api.post<AdminCategoryStoreResponse>(
    ENDPOINTS.BLOG.admin.categories.store,
    payload
  );
  return data;
}

export async function adminUpdateCategory(
  id: number | string,
  payload: AdminCategoryUpdatePayload
): Promise<AdminCategoryUpdateResponse> {
  const { data } = await api.put<AdminCategoryUpdateResponse>(
    ENDPOINTS.BLOG.admin.categories.update(id),
    payload
  );
  return data;
}

export async function adminDestroyCategory(
  id: number | string
): Promise<AdminCategoryDestroyResponse> {
  const { data } = await api.delete<AdminCategoryDestroyResponse>(
    ENDPOINTS.BLOG.admin.categories.destroy(id)
  );
  return data;
}

// ============ Admin: Tags ============

export async function adminListTags(
  params: AdminTagsIndexParams = {}
): Promise<AdminTagsIndexResponse> {
  const { data } = await api.get<AdminTagsIndexResponse>(
    ENDPOINTS.BLOG.admin.tags.index,
    { params }
  );
  return data;
}

export async function adminStoreTag(
  payload: AdminTagStorePayload
): Promise<AdminTagStoreResponse> {
  const { data } = await api.post<AdminTagStoreResponse>(
    ENDPOINTS.BLOG.admin.tags.store,
    payload
  );
  return data;
}

export async function adminUpdateTag(
  id: number | string,
  payload: AdminTagUpdatePayload
): Promise<AdminTagUpdateResponse> {
  const { data } = await api.put<AdminTagUpdateResponse>(
    ENDPOINTS.BLOG.admin.tags.update(id),
    payload
  );
  return data;
}

export async function adminDestroyTag(
  id: number | string
): Promise<AdminTagDestroyResponse> {
  const { data } = await api.delete<AdminTagDestroyResponse>(
    ENDPOINTS.BLOG.admin.tags.destroy(id)
  );
  return data;
}

// ============ Admin: Media (Post Images) ============

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
