"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useToastStore, type ToastType } from "@/store/toast";
import { cn } from "@/lib/utils";

const CONFIG: Record<ToastType, {
  icon:       React.ElementType;
  colorText:  string;
  colorBorder: string;
  colorBg:    string;
  label:      string;
}> = {
  success: {
    icon:        CheckCircle,
    colorText:   "text-green-400",
    colorBorder: "border-green-500/40",
    colorBg:     "bg-green-500/10",
    label:       "SUCCESS",
  },
  error: {
    icon:        AlertCircle,
    colorText:   "text-red-400",
    colorBorder: "border-red-500/40",
    colorBg:     "bg-red-500/10",
    label:       "ERROR",
  },
  warning: {
    icon:        AlertTriangle,
    colorText:   "text-yellow-400",
    colorBorder: "border-yellow-500/40",
    colorBg:     "bg-yellow-500/10",
    label:       "WARNING",
  },
  info: {
    icon:        Info,
    colorText:   "text-cyan",
    colorBorder: "border-cyan/30",
    colorBg:     "bg-cyan/5",
    label:       "INFO",
  },
};

export function ToastContainer() {
  const { toasts, remove } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-200 flex flex-col gap-2 w-full max-w-xs pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const { icon: Icon, colorText, colorBorder, colorBg, label } =
            CONFIG[toast.type];

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0,  scale: 1   }}
              exit={{    opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn(
                "pointer-events-auto flex items-start gap-3 px-4 py-3 border bg-bg-dark",
                "shadow-lg backdrop-blur-sm",
                colorBorder,
                colorBg
              )}
            >
              <Icon size={14} className={cn("mt-0.5 shrink-0", colorText)} />

              <div className="flex-1 min-w-0">
                <p className={cn("font-mono text-[0.6rem] tracking-widest uppercase", colorText)}>
                  {label}
                </p>
                <p className="font-display text-[0.7rem] tracking-wide text-text-primary mt-0.5 leading-snug">
                  {toast.title}
                </p>
                {toast.message && (
                  <p className="font-mono text-[0.6rem] text-text-dim mt-0.5 leading-relaxed">
                    {toast.message}
                  </p>
                )}
              </div>

              <button
                onClick={() => remove(toast.id)}
                className="shrink-0 text-text-dim hover:text-text-primary transition-colors mt-0.5"
                aria-label="Cerrar"
              >
                <X size={12} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
