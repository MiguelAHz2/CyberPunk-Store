import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base = "relative inline-flex items-center justify-center font-display tracking-widest uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  const variants = {
    primary:   "btn-cyber-primary",
    secondary: "btn-cyber-secondary",
    ghost:     "border border-border-cyan text-text-muted hover:text-cyan hover:border-cyan hover:shadow-[0_0_10px_var(--cyan-glow)]",
    danger:    "border border-red-500 text-red-400 hover:bg-red-500 hover:text-bg-deep hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]",
  };

  const sizes = {
    sm: "text-[0.65rem] px-3 py-1.5",
    md: "text-[0.75rem] px-5 py-2.5",
    lg: "text-[0.85rem] px-8 py-3.5",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>Procesando...</span>
        </span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}
