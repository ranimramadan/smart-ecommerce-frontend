// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000",
  withCredentials: true,                // يرسل الكوكيز
  xsrfCookieName: "XSRF-TOKEN",         // اسم كوكي CSRF من لارافيل
  xsrfHeaderName: "X-XSRF-TOKEN",       // اسم الهيدر المطلوب من لارافيل
});

// ⚠️ Safari/بعض الحالات: Axios أحيانًا ما يعبي الهيدر تلقائيًا.
// نقرأ الكوكي يدويًا ونعيّن الهيدر قبل كل طلب.
api.interceptors.request.use((config) => {
  if (typeof document !== "undefined") {
    const ck = document.cookie.split("; ").find(c => c.startsWith("XSRF-TOKEN="));
    const raw = ck?.split("=")[1] || "";
    // الكوكي URL-encoded؛ لازم نفكّه
    const token = raw ? decodeURIComponent(raw) : "";
    if (token && !config.headers?.["X-XSRF-TOKEN"]) {
      (config.headers as any)["X-XSRF-TOKEN"] = token;
    }
  }
  return config;
});

export default api;
