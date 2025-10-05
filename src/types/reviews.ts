// src/types/reviews.ts
import type { Paginated } from "@/types/common";

export type ReviewStatus = "approved" | "pending" | "rejected";
export type ReviewReportReason = "abuse" | "spam" | "off_topic" | "privacy" | "other";

export interface ReviewUserLite {
  id: number;
  first_name?: string | null;
  last_name?: string | null;
}

export interface ReviewMedia {
  id: number;
  review_id: number;
  file_path: string;     // مسار داخل التخزين
  mime_type: string;
  size: number;
  type: "image" | "video";
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  // ممكن السيرفر يزوّد URL كامل إن متاح
  url?: string | null;
}

export interface ProductReview {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;            // 1..5
  title?: string | null;
  body?: string | null;
  status: ReviewStatus;
  is_verified?: boolean;
  has_media?: boolean;
  reported_count?: number;
  admin_note?: string | null;
  moderated_by_id?: number | null;
  moderated_at?: string | null;
  created_at?: string;
  updated_at?: string;

  user?: ReviewUserLite | null;
  media?: ReviewMedia[];
}

export interface ReviewsIndexFilters {
  q?: string;
  sort?: "newest" | "highest" | "lowest" | "helpful";
  rating?: 1 | 2 | 3 | 4 | 5;
  with_media?: boolean;
  page?: number;
  per_page?: number; // max 50
}

export type ReviewsIndexResponse = Paginated<ProductReview>;

export interface ReviewsSummary {
  product_id: number;
  count: number;
  average: number; // 0..5 (مثلاً 4.35)
  // توزيع النجوم 1..5 (مصفوفة/خريطة)
  distribution: Record<number, number>;
}
export type ReviewsSummaryResponse = ReviewsSummary;

// ===== Auth payloads =====
export interface CreateReviewPayload {
  rating: number; // 1..5
  title?: string | null;
  body?: string | null;
  media?: File[]; // <= 6; صور/MP4
}
export type CreateReviewResponse = ProductReview;

export interface UpdateReviewPayload {
  rating?: number; // 1..5
  title?: string | null;
  body?: string | null;
  new_media?: File[];     // إضافة جديدة
  remove_media?: number[]; // IDs للحذف
}
export type UpdateReviewResponse = ProductReview;

export type DeleteReviewResponse = null;

export interface VoteHelpfulPayload {
  is_helpful: boolean;
}
export interface VoteHelpfulResponse {
  ok: true;
  helpful: number;
  unhelpful: number;
}
export interface UnvoteHelpfulResponse {
  ok: true;
  helpful: number;
  unhelpful: number;
}

// ===== Reports (Admin) =====
export interface ReviewReport {
  id: number;
  review_id: number;
  user_id: number;
  reason: ReviewReportReason;
  note?: string | null;
  created_at?: string;
  updated_at?: string;

  // غالباً السيرفر يعيد review + user lite
  review?: { id: number; product_id: number; user_id: number; status: ReviewStatus; rating: number; product?: { id: number; name: string } };
  user?: ReviewUserLite;
}
export interface ReportsIndexFilters {
  q?: string;
  reason?: ReviewReportReason;
  product_id?: number;
  review_status?: ReviewStatus;
  user_id?: number;
  sort?: "newest" | "oldest";
  page?: number;
  per_page?: number; // max 50
}
export type ReportsIndexResponse = Paginated<ReviewReport>;
export interface DeleteReportResponse {
  ok: true;
  reported_count: number;
}

// ===== Moderation =====
export interface ModerateReviewPayload {
  status: ReviewStatus; // approved | pending | rejected
  admin_note?: string | null;
}
export type ModerateReviewResponse = ProductReview;
