import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TinyLink | URL Shortener",
  description:
    "Create, manage, and track lightning-fast short links powered by TinyLink.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased`}
      >
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 select-none"
        >
          <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.35),_transparent_65%)] blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.28),_transparent_60%)] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_45%)] dark:opacity-40" />
        </div>
        <div className="relative z-10 flex min-h-dvh flex-col">
          {children}
        </div>
        <Toaster position="top-center" richColors theme="system" closeButton />
      </body>
    </html>
  );
}
