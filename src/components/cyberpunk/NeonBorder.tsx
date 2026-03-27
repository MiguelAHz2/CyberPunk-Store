import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface NeonBorderProps {
  children: ReactNode;
  className?: string;
  color?: "cyan" | "pink" | "purple";
  pulse?: boolean;
  corners?: boolean;
}

export function NeonBorder({
  children,
  className,
  color = "cyan",
  pulse = false,
  corners = true,
}: NeonBorderProps) {
  const borderColor = {
    cyan:   "border-cyan   shadow-[0_0_12px_var(--cyan-glow),inset_0_0_12px_var(--cyan-glow)]",
    pink:   "border-pink   shadow-[0_0_12px_var(--pink-glow),inset_0_0_12px_var(--pink-glow)]",
    purple: "border-purple shadow-[0_0_12px_var(--purple-glow),inset_0_0_12px_var(--purple-glow)]",
  }[color];

  return (
    <div
      className={cn(
        "relative border",
        borderColor,
        pulse && "animate-neon-pulse",
        corners && "cyber-corners",
        className
      )}
    >
      {children}
    </div>
  );
}
