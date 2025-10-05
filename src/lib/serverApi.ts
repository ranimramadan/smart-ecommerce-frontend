
export async function serverApi<T = any>(path: string, init?: RequestInit): Promise<T> {
  const base = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const res = await fetch(base + path, { cache: "no-store", ...init });
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}
