import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "pink" | "purple" | "yellow" | "dim";
  className?: string;
}

export function Badge({ children, variant = "cyan", className }: BadgeProps) {
  const variants = {
    cyan:   "border-cyan   text-cyan   bg-[rgba(0,245,255,0.08)]",
    pink:   "border-pink   text-pink   bg-[rgba(255,0,110,0.08)]",
    purple: "border-purple text-purple bg-[rgba(180,0,255,0.08)]",
    yellow: "border-yellow text-yellow bg-[rgba(245,230,66,0.08)]",
    dim:    "border-border-dim text-text-muted bg-bg-card",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center border font-mono text-[0.65rem] tracking-widest uppercase px-2 py-0.5",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
