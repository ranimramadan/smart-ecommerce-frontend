// src/stores/auth.ts
"use client";

import { create } from "zustand";
import * as Auth from "@/services/auth";
import type { User } from "@/types/auth";
import {
  ROLE_GROUPS,
  hasAnyRole as hasAnyRoleCfg,
  inGroup as inGroupCfg,
  homeFor,
} from "@/config/auth";

/** Helper: رجّع أول رسالة فاليديشن من Laravel إن وُجدت. */
function firstLaravelError(e: any): string | undefined {
  const errs = e?.response?.data?.errors;
  if (errs && typeof errs === "object") {
    const key = Object.keys(errs)[0];
    const arr = (errs as Record<string, string[]>)[key];
    if (Array.isArray(arr) && arr.length) return arr[0];
  }
  return e?.response?.data?.message || e?.message;
}

type LoginPayload = { email: string; password: string };
type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type AuthStore = {
  user: User | null;
  ready: boolean;      // حمّلنا /api/user بعد الريفريش؟
  loading: boolean;
  error: string | null;

  // setters صغيرة مفيدة
  setUser: (u: User | null) => void;
  clearError: () => void;

  // actions
  loadMe: () => Promise<void>;
  login: (p: LoginPayload) => Promise<void>;
  register: (p: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;

  // helpers عامة
  roles: () => string[];                         // أدوار المستخدم lowercase
  hasAnyRole: (roles: string[]) => boolean;      // يقبل array
  hasRole: (role: string | string[]) => boolean; // يقبل واحد أو مجموعة
  inGroup: (group: keyof typeof ROLE_GROUPS) => boolean;

  // اختصارات شائعة
  isAdmin: () => boolean;
  homeForMe: () => string;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  ready: false,
  loading: false,
  error: null,

  /* setters */
  setUser: (u) => set({ user: u, error: null }),
  clearError: () => set({ error: null }),

  /* ===== Actions ===== */

  async loadMe() {
    try {
      const me = await Auth.me();
      set({ user: me, ready: true, error: null });
    } catch {
      set({ user: null, ready: true });
    }
  },

  async login(payload) {
    set({ loading: true, error: null });
    try {
      await Auth.login(payload);
      const me = await Auth.me();
      set({ user: me });
    } catch (e: any) {
      set({ error: firstLaravelError(e) ?? "Login failed" });
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  async register(payload) {
    set({ loading: true, error: null });
    try {
      await Auth.register(payload); // إنشاء فقط
      // ما منسجّل دخوله تلقائيًا؛ القرار للواجهة
    } catch (e: any) {
      set({ error: firstLaravelError(e) ?? "Registration failed" });
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  async logout() {
    set({ loading: true, error: null });
    try {
      await Auth.logout();
      set({ user: null, error: null });
    } finally {
      set({ loading: false });
    }
  },

  /* ===== Helpers للأدوار ===== */

  roles: () =>
    (get().user?.roles ?? [])
      .map((r) => (r?.name || "").toLowerCase())
      .filter(Boolean),

  hasAnyRole: (roles) => hasAnyRoleCfg(get().roles(), roles),

  hasRole: (role) => {
    const wanted = Array.isArray(role) ? role : [role];
    return hasAnyRoleCfg(get().roles(), wanted);
  },

  inGroup: (group) => inGroupCfg(get().roles(), group),

  isAdmin: () => inGroupCfg(get().roles(), "admins"),

  homeForMe: () => homeFor(get().roles()),
}));
