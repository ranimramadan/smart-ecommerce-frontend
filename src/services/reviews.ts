// src/services/reviews.ts
import api from "@/lib/api";
import { ENDPOINTS } from "@/config/endpoints";

import type {
  ProductReview,
  ReviewsIndexFilters,
  ReviewsIndexResponse,
  ReviewsSummaryResponse,
  CreateReviewPayload,
  CreateReviewResponse,
  UpdateReviewPayload,
  UpdateReviewResponse,
  DeleteReviewResponse,
  VoteHelpfulPayload,
  VoteHelpfulResponse,
  UnvoteHelpfulResponse,
  ReportsIndexFilters,
  ReportsIndexResponse,
  DeleteReportResponse,
  ModerateReviewPayload,
  ModerateReviewResponse,
} from "@/types/reviews";

/** util: حوّل أي payload إلى FormData (يدعم مصفوفات وملفات) */
function toFormData(payload: Record<string, any>): FormData {
  const fd = new FormData();

  Object.entries(payload || {}).forEach(([k, v]) => {
    if (v === undefined || v === null) return;

    // ملفات متعددة (media/new_media)
    if (Array.isArray(v) && v.length && v[0] instanceof File) {
      v.forEach((file: File) => fd.append(`${k}[]`, file));
      return;
    }

    // مصفوفات IDs (remove_media[])
    if (Array.isArray(v)) {
      v.forEach((item) => fd.append(`${k}[]`, String(item)));
      return;
    }

    fd.append(k, v as any);
  });

  return fd;
}

/* ======================= Public ======================= */

/** قائمة مراجعات منشور معيّن (عام) */
export async function listProductReviews(
  productId: number | string,
  filters: ReviewsIndexFilters = {}
): Promise<ReviewsIndexResponse> {
  const { data } = await api.get<ReviewsIndexResponse>(
    ENDPOINTS.REVIEWS.public.index(productId),
    { params: filters }
  );
  return data;
}

/** ملخّص المراجعات (count/average/distribution) */
export async function getReviewsSummary(
  productId: number | string
): Promise<ReviewsSummaryResponse> {
  const { data } = await api.get<ReviewsSummaryResponse>(
    ENDPOINTS.REVIEWS.public.summary(productId)
  );
  return data;
}

/* ======================= Auth (Users) ======================= */

/** مراجعتي على المنتج (إن وجدت) */
export async function getMyReview(
  productId: number | string
): Promise<ProductReview | null> {
  const { data } = await api.get<ProductReview | null>(
    ENDPOINTS.REVIEWS.auth.myReview(productId)
  );
  return data;
}

/** إنشاء مراجعة جديدة (يدعم رفع ميديا) */
export async function createReview(
  productId: number | string,
  payload: CreateReviewPayload
): Promise<CreateReviewResponse> {
  const fd = toFormData(payload as any);
  const { data } = await api.post<CreateReviewResponse>(
    ENDPOINTS.REVIEWS.auth.store(productId),
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

/** تعديل مراجعة (يدعم إضافة/حذف ميديا) */
export async function updateReview(
  reviewId: number | string,
  payload: UpdateReviewPayload
): Promise<UpdateReviewResponse> {
  const fd = toFormData(payload as any);

  // بعض السيرفرات لا تحب PUT مع multipart، فبنرسل POST + _method=PUT
  const { data } = await api.post<UpdateReviewResponse>(
    ENDPOINTS.REVIEWS.auth.update(reviewId),
    fd,
    {
      headers: { "Content-Type": "multipart/form-data" },
      params: { _method: "PUT" },
    }
  );
  return data;
}

/** حذف مراجعة */
export async function deleteReview(
  reviewId: number | string
): Promise<DeleteReviewResponse> {
  const { data } = await api.delete<DeleteReviewResponse>(
    ENDPOINTS.REVIEWS.auth.destroy(reviewId)
  );
  return data;
}

/** تصويت مفيد/غير مفيد */
export async function voteHelpful(
  reviewId: number | string,
  payload: VoteHelpfulPayload
): Promise<VoteHelpfulResponse> {
  const { data } = await api.post<VoteHelpfulResponse>(
    ENDPOINTS.REVIEWS.auth.vote(reviewId),
    payload
  );
  return data;
}

/** إزالة التصويت */
export async function unvoteHelpful(
  reviewId: number | string
): Promise<UnvoteHelpfulResponse> {
  const { data } = await api.delete<UnvoteHelpfulResponse>(
    ENDPOINTS.REVIEWS.auth.vote(reviewId)
  );
  return data;
}

/** تبليغ عن مراجعة */
export async function reportReview(
  reviewId: number | string,
  reason: "abuse" | "spam" | "off_topic" | "privacy" | "other",
  note?: string
): Promise<{ ok: true; reported_count: number; status: "approved" | "pending" | "rejected" }> {
  const { data } = await api.post(
    ENDPOINTS.REVIEWS.auth.report(reviewId),
    { reason, note }
  );
  return data;
}

/* ======================= Admin ======================= */

/** تعديل حالة مراجعة (moderation) */
export async function moderateReview(
  reviewId: number | string,
  payload: ModerateReviewPayload
): Promise<ModerateReviewResponse> {
  const { data } = await api.put<ModerateReviewResponse>(
    ENDPOINTS.REVIEWS.admin.moderate(reviewId),
    payload
  );
  return data;
}

/** قائمة التبليغات على المراجعات */
export async function listReviewReports(
  filters: ReportsIndexFilters = {}
): Promise<ReportsIndexResponse> {
  const { data } = await api.get<ReportsIndexResponse>(
    ENDPOINTS.REVIEWS.admin.reportsIndex,
    { params: filters }
  );
  return data;
}

/** حذف تبليغ واحد وتحديث عدّاد المراجعة */
export async function deleteReviewReport(
  reportId: number | string
): Promise<DeleteReportResponse> {
  const { data } = await api.delete<DeleteReportResponse>(
    ENDPOINTS.REVIEWS.admin.deleteReport(reportId)
  );
  return data;
}
