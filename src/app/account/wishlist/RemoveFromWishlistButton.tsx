"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toggleWishlist } from "@/app/actions/wishlist";
import { useRouter } from "next/navigation";

export function RemoveFromWishlistButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRemove = () => {
    startTransition(async () => {
      await toggleWishlist({
        product_id:     productId,
        product_handle: "",
        product_title:  "",
        product_image:  null,
        product_price:  null,
        currency_code:  "USD",
      });
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      className="p-1.5 text-text-dim hover:text-red-400 transition-colors disabled:opacity-50"
      aria-label="Quitar de wishlist"
    >
      <Trash2 size={12} />
    </button>
  );
}
