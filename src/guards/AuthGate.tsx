"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuthStore();
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      const next = sp.get("next") || pathname || "/";
      router.replace(`/auth/login?next=${encodeURIComponent(next)}`);
    }
  }, [ready, user, router, sp, pathname]);

  if (!ready) return null;
  if (!user) return null;
  return <>{children}</>;
}
