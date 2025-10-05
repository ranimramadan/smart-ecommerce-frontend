// // services/auth.ts
// import api from "@/lib/api";

// export async function getCsrfCookie() {
//   // يزرع XSRF-TOKEN + laravel_session
//   await api.get("/sanctum/csrf-cookie");
// }

// export async function register(payload: {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   password_confirmation: string;
// }) {
//   await getCsrfCookie();
//   const { data } = await api.post("/api/auth/register", payload);
//   return data;
// }

// export async function login(payload: { email: string; password: string }) {
//   await getCsrfCookie();
//   const { data } = await api.post("/api/auth/login", payload);
//   return data;
// }

// export async function me() {
//   const { data } = await api.get("/api/user");
//   return data;
// }

// export async function logout() {
//   const { data } = await api.post("/api/auth/logout");
//   return data;
// }

import api from "@/lib/api";
import type {
  RegisterResponse,
  LoginResponse,
  MeResponse,
  LogoutResponse,
} from "@/types/auth";

// يزرع XSRF-TOKEN + laravel_session — يُستدعى قبل أول POST
export async function getCsrfCookie(): Promise<void> {
  await api.get("/sanctum/csrf-cookie");
}

export async function register(payload: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<RegisterResponse> {
  await getCsrfCookie();
  const { data } = await api.post<RegisterResponse>("/api/auth/register", payload);
  return data;
}

export async function login(payload: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  await getCsrfCookie();
  const { data } = await api.post<LoginResponse>("/api/auth/login", payload);
  return data;
}

export async function me(): Promise<MeResponse> {
  const { data } = await api.get<MeResponse>("/api/user");
  return data;
}

export async function logout(): Promise<LogoutResponse> {
  const { data } = await api.post<LogoutResponse>("/api/auth/logout");
  return data;
}
