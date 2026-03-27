import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: string | number, currencyCode = "USD"): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(Number(amount));
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
