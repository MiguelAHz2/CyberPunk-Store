"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  lineId: string;
  variantId: string;
  productId: string;
  handle: string;
  title: string;
  variantTitle: string;
  price: string;
  currencyCode: string;
  quantity: number;
  image: string | null;
}

interface CartStore {
  cartId: string | null;
  checkoutUrl: string | null;
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;

  setCartId: (id: string) => void;
  setCheckoutUrl: (url: string) => void;
  setItems: (items: CartItem[]) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setLoading: (loading: boolean) => void;
  clearCart: () => void;

  totalQuantity: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId:      null,
      checkoutUrl: null,
      items:       [],
      isOpen:      false,
      isLoading:   false,

      setCartId:      (id)    => set({ cartId: id }),
      setCheckoutUrl: (url)   => set({ checkoutUrl: url }),
      setItems:       (items) => set({ items }),
      openCart:       ()      => set({ isOpen: true }),
      closeCart:      ()      => set({ isOpen: false }),
      toggleCart:     ()      => set((s) => ({ isOpen: !s.isOpen })),
      setLoading:     (l)     => set({ isLoading: l }),
      clearCart:      ()      => set({ cartId: null, checkoutUrl: null, items: [] }),

      totalQuantity: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      totalPrice:    () =>
        get().items.reduce(
          (acc, i) => acc + parseFloat(i.price),
          0
        ),
    }),
    {
      name: "cyberpunk-cart",
      partialize: (state) => ({
        cartId:      state.cartId,
        checkoutUrl: state.checkoutUrl,
        items:       state.items,
      }),
    }
  )
);
