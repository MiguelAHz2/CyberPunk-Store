"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import type { ShopifyProductVariant } from "@/lib/shopify/types";

interface AddToCartButtonProps {
  selectedVariant: ShopifyProductVariant | null;
  availableForSale: boolean;
}

export function AddToCartButton({
  selectedVariant,
  availableForSale,
}: AddToCartButtonProps) {
  const { addItem, loading } = useAddToCart();
  const [added, setAdded]    = useState(false);

  const handleAdd = async () => {
    if (!selectedVariant || !availableForSale) return;
    await addItem(selectedVariant.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!availableForSale) {
    return (
      <Button variant="ghost" disabled fullWidth size="lg">
        AGOTADO
      </Button>
    );
  }

  return (
    <Button
      variant={added ? "secondary" : "primary"}
      size="lg"
      loading={loading}
      onClick={handleAdd}
      disabled={!selectedVariant}
      fullWidth
    >
      {added ? (
        <span className="flex items-center gap-2">
          <Check size={14} />
          AGREGADO AL CARRITO
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <ShoppingCart size={14} />
          AGREGAR AL CARRITO
        </span>
      )}
    </Button>
  );
}
