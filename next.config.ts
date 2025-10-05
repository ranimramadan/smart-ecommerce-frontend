
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // صور Laravel من التخزين المحلي
      { protocol: "http", hostname: "localhost",  port: "8000", pathname: "/storage/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/storage/**" },
      // لو لاحقًا استخدمتي دومين HTTPS (مثلاً Herd .test) أضيفي سطر مثل:
      // { protocol: "https", hostname: "smartecommerce_backend.test", pathname: "/storage/**" },
    ],
  },
};

export default nextConfig;
