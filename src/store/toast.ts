"use client";

import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id:      string;
  type:    ToastType;
  title:   string;
  message?: string;
}

interface ToastStore {
  toasts: Toast[];
  add:    (toast: Omit<Toast, "id">) => void;
  remove: (id: string) => void;
  clear:  () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 4000);
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  clear:  () => set({ toasts: [] }),
}));

// Hook de conveniencia
export function useToast() {
  const { add } = useToastStore();
  return {
    success: (title: string, message?: string) => add({ type: "success", title, message }),
    error:   (title: string, message?: string) => add({ type: "error",   title, message }),
    info:    (title: string, message?: string) => add({ type: "info",    title, message }),
    warning: (title: string, message?: string) => add({ type: "warning", title, message }),
  };
}
