"use client";

import { useEffect, useState } from "react";
import { me } from "@/services/auth";
import type { User } from "@/types/auth";

export function useMe() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let on = true;
    me()
      .then((u) => on && setUser(u))
      .catch(() => on && setUser(null))
      .finally(() => on && setLoading(false));
    return () => { on = false; };
  }, []);

  return { user, loading };
}
