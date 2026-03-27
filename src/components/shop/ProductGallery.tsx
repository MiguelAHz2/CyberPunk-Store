"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ShopifyProductImage } from "@/lib/shopify/types";

interface ProductGalleryProps {
  images: ShopifyProductImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-bg-dark border border-border-dim flex items-center justify-center">
        <span className="font-mono text-xs text-text-dim">NO IMAGE</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden border border-border-cyan shadow-[0_0_20px_var(--cyan-glow)]">
        <Image
          src={images[selected].url}
          alt={images[selected].altText ?? title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {/* Scanline overlay on image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)",
          }}
        />
        {/* Corner decoration */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setSelected(i)}
              className={cn(
                "relative flex-shrink-0 w-16 h-16 overflow-hidden border transition-all duration-200",
                i === selected
                  ? "border-cyan shadow-[0_0_8px_var(--cyan-glow)]"
                  : "border-border-dim opacity-60 hover:opacity-100 hover:border-border-cyan"
              )}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
