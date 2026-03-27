"use client";

import { useCallback, useState } from "react";
import { useCartStore } from "@/store/cart";
import { createCartAction, addToCartAction } from "@/app/actions/cart";

export function useAddToCart() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const { cartId, setCartId, setCheckoutUrl, setItems, openCart } =
    useCartStore();

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      setLoading(true);
      setError(null);

      try {
        let result: Awaited<ReturnType<typeof createCartAction>>;

        if (cartId) {
          result = await addToCartAction(cartId, [
            { merchandiseId: variantId, quantity },
          ]);
        } else {
          result = await createCartAction([
            { merchandiseId: variantId, quantity },
          ]);
        }

        setCartId(result.cartId);
        setCheckoutUrl(result.checkoutUrl);
        setItems(result.items);
        openCart();
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Error al agregar al carrito";
        setError(msg);
        console.error("Add to cart error:", err);
      } finally {
        setLoading(false);
      }
    },
    [cartId, setCartId, setCheckoutUrl, setItems, openCart]
  );

  return { addItem, loading, error };
}
