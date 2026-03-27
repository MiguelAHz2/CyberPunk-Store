import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="font-mono text-xs tracking-widest uppercase text-text-muted"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}
        <input
          id={id}
          {...props}
          className={cn(
            "w-full bg-bg-card border border-border-dim text-text-primary",
            "font-mono text-sm px-4 py-2.5 outline-none transition-all duration-300",
            "placeholder:text-text-dim",
            "focus:border-cyan focus:shadow-[0_0_8px_var(--cyan-glow)]",
            icon && "pl-10",
            error && "border-red-500 focus:border-red-500 focus:shadow-[0_0_8px_rgba(239,68,68,0.3)]",
            className
          )}
        />
      </div>
      {error && (
        <p className="font-mono text-xs text-red-400 tracking-wide">{error}</p>
      )}
    </div>
  );
}
