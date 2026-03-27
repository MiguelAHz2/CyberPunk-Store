"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value:      number;
  onChange?:  (v: number) => void;
  size?:      number;
  readonly?:  boolean;
  className?: string;
}

export function StarRating({
  value,
  onChange,
  size = 14,
  readonly = false,
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={cn(
            "transition-colors",
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          )}
          aria-label={`${star} estrellas`}
        >
          <Star
            size={size}
            className={cn(
              "transition-colors",
              star <= active
                ? "text-yellow fill-yellow"
                : "text-text-dim fill-transparent"
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function StarDisplay({
  rating,
  count,
  size = 12,
}: {
  rating: number;
  count?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <StarRating value={Math.round(rating)} size={size} readonly />
      <span className="font-mono text-[0.6rem] text-text-muted">
        {rating.toFixed(1)}
        {count !== undefined && (
          <span className="text-text-dim ml-1">({count})</span>
        )}
      </span>
    </div>
  );
}
