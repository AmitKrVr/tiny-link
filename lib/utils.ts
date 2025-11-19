import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string) {
  try {
    const parsed = new URL(url);
    return Boolean(parsed.protocol && parsed.host);
  } catch {
    return false;
  }
}

export function generateShortCode() {
  const min = 6;
  const max = 8;
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  let code = "";

  for (let i = 0; i < length; i += 1) {
    const index = Math.floor(Math.random() * ALPHABET.length);
    code += ALPHABET[index];
  }

  return code;
}

export function formatDate(date?: Date | string | null) {
  if (!date) {
    return "Never";
  }

  const value = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export function truncate(value: string, max = 48) {
  if (value.length <= max) {
    return value;
  }

  return `${value.slice(0, max - 3)}...`;
}

export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return (process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(
    /\/$/,
    "",
  );
}

export function buildShortUrl(code: string) {
  const base = getBaseUrl() || "http://localhost:3000";
  return `${base}/${code}`;
}
