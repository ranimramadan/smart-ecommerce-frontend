"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth";

// يُستَخدم داخل layout الجذري لتحميل /api/user مرّة واحدة بعد الريفريش
export default function AuthHydrator() {
  const ready = useAuthStore(s => s.ready);
  const loadMe = useAuthStore(s => s.loadMe);

  useEffect(() => {
    if (!ready) loadMe();
  }, [ready, loadMe]);

  return null;
}
