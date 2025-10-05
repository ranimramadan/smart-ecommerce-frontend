// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import AuthHydrator from "@/components/AuthHydrator";

export const metadata: Metadata = {
  title: "Smart E-commerce",
  description: "Modern e-commerce built with Next.js + Laravel Sanctum",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>
        {/* يُحمّل /api/user مرة واحدة ويملأ Zustand */}
        <AuthHydrator/>
        {/* ممكن تضيف هنا Navbar/Footer عامة للموقع */}
        {children}
      </body>
    </html>
  );
}
