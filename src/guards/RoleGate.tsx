"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { inGroup, homeFor, ROLE_GROUPS } from "@/config/auth";

type Props = {
  /** مجموعة واحدة مثل "admins" */
  group?: keyof typeof ROLE_GROUPS;
  /** مجموعات متعددة بنفس الوقت مثل ["admins","staff"] */
  allowGroups?: Array<keyof typeof ROLE_GROUPS>;
  /** أدوار صريحة بدل المجموعات */
  roles?: string[];
  children: React.ReactNode;
};

export default function RoleGate({
  group = "admins",
  allowGroups,
  roles,
  children,
}: Props) {
  const { user, ready } = useAuthStore();
  const router = useRouter();

  const userRoles = useMemo(
    () => (user?.roles ?? []).map(r => (r?.name || "").toLowerCase()),
    [user]
  );

  const allowed = useMemo(() => {
    if (!user) return false;

    // 1) أولوية للأدوار الصريحة إن أرسلتِها
    if (roles?.length) {
      const wanted = roles.map(r => r.toLowerCase());
      return wanted.some(r => userRoles.includes(r));
    }

    // 2) ثم allowGroups (OR بين المجموعات)
    if (allowGroups?.length) {
      return allowGroups.some(g => inGroup(userRoles, g));
    }

    // 3) وإلا استعملي prop group الافتراضية ("admins")
    return inGroup(userRoles, group);
  }, [user, roles, allowGroups, group, userRoles]);

  useEffect(() => {
    if (!ready) return;
    if (!user) return;                // AuthGate أعلى ممكن يتكفل بتوجيه الضيوف
    if (!allowed) router.replace(homeFor(userRoles));
  }, [ready, user, allowed, router, userRoles]);

  if (!ready) return null;
  if (!user || !allowed) return null;
  return <>{children}</>;
}
