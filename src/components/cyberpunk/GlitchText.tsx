"use client";

import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  color?: "cyan" | "pink" | "purple" | "white";
}

export function GlitchText({
  text,
  className,
  as: Tag = "span",
  color = "cyan",
}: GlitchTextProps) {
  const colorClass = {
    cyan:   "text-neon-cyan",
    pink:   "text-neon-pink",
    purple: "text-neon-purple",
    white:  "text-white",
  }[color];

  return (
    <Tag
      className={cn(
        "relative inline-block font-display animate-glitch select-none",
        colorClass,
        className
      )}
      data-text={text}
    >
      {/* Main text */}
      {text}
      {/* Glitch layers */}
      <span
        aria-hidden
        className="glitch-layer-1 absolute inset-0 pointer-events-none"
        style={{ color: "var(--cyan)" }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="glitch-layer-2 absolute inset-0 pointer-events-none"
        style={{ color: "var(--pink)" }}
      >
        {text}
      </span>
    </Tag>
  );
}
