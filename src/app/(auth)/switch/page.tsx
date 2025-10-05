"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { register as doRegister, login as doLogin, me as getMe } from "@/services/auth";
import { useRouter } from "next/navigation";

import { homeFor } from "@/config/auth";
import { useAuthStore } from "@/stores/auth";

// أيقونات
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function AuthSwitch() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  // أسماء منفصلة
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [err, setErr]           = useState<string | null>(null);

  const router = useRouter();

  const overlayPos = useMemo<"left" | "right">(
    () => (mode === "login" ? "right" : "left"),
    [mode]
  );

  function pickError(e: any): string {
    const data = e?.response?.data;
    if (data?.errors) {
      const first = Object.values<string[]>(data.errors)[0];
      if (Array.isArray(first) && first.length) return first[0];
    }
    return data?.message || "Something went wrong";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        await doRegister({
          first_name: firstName,
          last_name : lastName,
          email,
          password,
          password_confirmation: password,
        });
        setMode("login");
      }

      if (mode === "login") {
        await doLogin({ email, password });
        const me = await getMe();
        useAuthStore.getState().setUser(me);
        const roles = (me.roles ?? []).map((r: any) => (r?.name || "").toLowerCase());
        const target = homeFor(roles);
        router.replace(target);
      }
    } catch (e: any) {
      setErr(pickError(e));
    } finally {
      setLoading(false);
    }
  }

  // كلاس جاهز لزر الأيقونة (رمادي وخفيف)
  const socialBtn =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 " +
    "text-slate-400 hover:text-slate-600 hover:border-slate-300 shadow-sm transition";

  return (
    <main className="min-h-[100svh] grid place-items-center px-4">
      <div className="auth-switch-card auth-fixed-h w-full max-w-5xl">
        {/* اللوح المتحرك */}
        <div className="auth-overlay" data-pos={overlayPos}>
          <span className="ov-arc top" />
          <span className="ov-arc bottom" />
          <div className="overlay-content">
            <div className="form-wrap text-center">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {mode === "login" ? "Hello Friend !" : "Welcome Back !"}
              </h3>
              <p className="text-sm text-slate-600">
                {mode === "login"
                  ? "Enter your personal details and start journey with us."
                  : "To keep connected with us please login with your personal info"}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="btn-pill btn-mid"
                >
                  {mode === "login" ? "SIGN UP" : "SIGN IN"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* الأعمدة */}
        <div className="auth-grid relative" data-mode={mode}>
          {/* يسار — Login */}
          <section className="auth-col">
            <AnimatePresence mode="wait">
              {mode === "login" && (
                <motion.div
                  key="left-login"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="form-wrap text-center">
                    {/* عنوان أكبر + مسافة أوضح */}
                    <h2 className="text-3xl md:text-[32px] leading-tight font-extrabold text-slate-800 mb-4">
                      Sign in to Website
                    </h2>

                    {/* أيقونات رماديّة وبينها مسافة مناسبة */}
                    <div className="mt-3 mb-2 flex items-center justify-center gap-3">
                      <button type="button" className={socialBtn} aria-label="Sign in with Google">
                        <FaGoogle className="h-4 w-4" />
                      </button>
                      <button type="button" className={socialBtn} aria-label="Sign in with Facebook">
                        <FaFacebookF className="h-4 w-4" />
                      </button>
                      <button type="button" className={socialBtn} aria-label="Sign in with LinkedIn">
                        <FaLinkedinIn className="h-4 w-4" />
                      </button>
                    </div>

                    {/* الجملة الصغيرة أسفل الأيقونات وبمسافة لطيفة */}
                    <p className="text-xs md:text-sm text-slate-500 mt-2">
                      or use your email account
                    </p>

                    <form onSubmit={onSubmit} className="mt-6 space-y-3">
                      <input
                        className="input-line"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <input
                        className="input-line"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      <div className="text-sm">
                        <a href="/reset-password" className="link-sky">
                          Forgot your password?
                        </a>
                      </div>

                      {err && mode === "login" && (
                        <div className="rounded-md bg-red-500/10 text-red-500 px-3 py-2 text-sm">
                          {err}
                        </div>
                      )}

                      <div className="mt-2 flex justify-center">
                        <button disabled={loading} className="btn-pill btn-mid">
                          {loading ? "Signing in…" : "SIGN IN"}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* يمين — Sign up */}
          <section className="auth-col">
            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div
                  key="right-signup"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 18 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="form-wrap text-center">
                    <h2 className="text-3xl md:text-[32px] leading-tight font-extrabold text-slate-800 mb-4">
                      Create Account
                    </h2>

                    <div className="mt-3 mb-2 flex items-center justify-center gap-3">
                      <button type="button" className={socialBtn} aria-label="Sign up with Google">
                        <FaGoogle className="h-4 w-4" />
                      </button>
                      <button type="button" className={socialBtn} aria-label="Sign up with Facebook">
                        <FaFacebookF className="h-4 w-4" />
                      </button>
                      <button type="button" className={socialBtn} aria-label="Sign up with LinkedIn">
                        <FaLinkedinIn className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-xs md:text-sm text-slate-500 mt-2">
                      or use your email for registration
                    </p>

                    <form onSubmit={onSubmit} className="mt-6 space-y-3">
                      {/* حقلا الاسم */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          className="input-line"
                          placeholder="First name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                        <input
                          className="input-line"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>

                      <input
                        className="input-line"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <input
                        className="input-line"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      {err && mode === "signup" && (
                        <div className="rounded-md bg-red-500/10 text-red-500 px-3 py-2 text-sm">
                          {err}
                        </div>
                      )}

                      <div className="flex items-center justify-center gap-3">
                        <button disabled={loading} className="btn-pill btn-mid">
                          {loading ? "Creating…" : "SIGN UP"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="btn-ghost btn-mid"
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}
