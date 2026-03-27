"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleWishlist } from "@/app/actions/wishlist";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId:    string;
  handle:       string;
  title:        string;
  image:        string | null;
  price:        string | null;
  currencyCode: string;
  initialState: boolean;
}

export function WishlistButton({
  productId,
  handle,
  title,
  image,
  price,
  currencyCode,
  initialState,
}: WishlistButtonProps) {
  const [inWishlist, setInWishlist] = useState(initialState);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleWishlist({
        product_id:     productId,
        product_handle: handle,
        product_title:  title,
        product_image:  image,
        product_price:  price,
        currency_code:  currencyCode,
      });

      if (result.error) {
        setToast(result.error);
        setTimeout(() => setToast(null), 3000);
        return;
      }

      setInWishlist(result.inWishlist);
      setToast(result.inWishlist ? "Agregado a wishlist" : "Eliminado de wishlist");
      setTimeout(() => setToast(null), 2000);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={cn(
          "p-3 border transition-all duration-200",
          inWishlist
            ? "border-pink text-pink shadow-[0_0_10px_rgba(255,0,110,0.3)]"
            : "border-border-dim text-text-muted hover:border-pink hover:text-pink",
          isPending && "opacity-50 cursor-not-allowed"
        )}
        aria-label={inWishlist ? "Quitar de wishlist" : "Agregar a wishlist"}
      >
        <Heart
          size={16}
          fill={inWishlist ? "currentColor" : "none"}
          className="transition-all"
        />
      </button>

      {/* Mini toast */}
      {toast && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.6rem] tracking-widest px-2 py-1 border border-border-dim bg-bg-dark text-text-muted">
          {toast}
        </div>
      )}
    </div>
  );
}
