// src/config/auth.ts

// مجموعات الأدوار — خليه as const ليبقى readonly (آمن)
export const ROLE_GROUPS = {
  admins:  ["admin", "manager"],
  staff:   ["admin", "manager", "support", "moderator"],
  premium: ["gold", "plus", "vip"],
} as const;

// دوال مساعدة عامة (تتعامل مع ReadonlyArray لتفادي مشاكل النوع)
export function normalize(roles: ReadonlyArray<string> = []) {
  return roles.map(r => (r || "").toLowerCase());
}

export function hasAnyRole(
  userRoles: ReadonlyArray<string> = [],
  wanted: ReadonlyArray<string>
) {
  const have = normalize(userRoles);
  const want = normalize(wanted);
  return have.some(r => want.includes(r));
}

export function inGroup(
  userRoles: ReadonlyArray<string> = [],
  group: keyof typeof ROLE_GROUPS
) {
  // ROLE_GROUPS[group] نوعه readonly string[] — والدالة تقبل ReadonlyArray<string> ✅
  return hasAnyRole(userRoles, ROLE_GROUPS[group]);
}

// وجهة الهبوط بعد تسجيل الدخول
export function homeFor(userRoles: ReadonlyArray<string> = []) {
  if (inGroup(userRoles, "admins")) return "/dashboard";
  return "/"; // الافتراضي لبقية المستخدمين
}
