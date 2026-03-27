"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X, Plus, Minus, ShoppingBag, Trash2, ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { formatPrice, cn } from "@/lib/utils";
import { updateCartAction, removeFromCartAction } from "@/app/actions/cart";

export function CartDrawer() {
  const {
    isOpen, closeCart, items, cartId, checkoutUrl,
    isLoading, setLoading, setItems, setCheckoutUrl, setCartId,
    totalQuantity, totalPrice,
  } = useCartStore();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleQuantityChange = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;
      setLoading(true);
      try {
        const result = await updateCartAction(cartId, [{ id: lineId, quantity }]);
        setCartId(result.cartId);
        setCheckoutUrl(result.checkoutUrl);
        setItems(result.items);
      } catch (e) {
        console.error("Update cart error:", e);
      } finally {
        setLoading(false);
      }
    },
    [cartId, setLoading, setCartId, setCheckoutUrl, setItems]
  );

  const handleRemove = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setLoading(true);
      try {
        const result = await removeFromCartAction(cartId, [lineId]);
        setCartId(result.cartId);
        setCheckoutUrl(result.checkoutUrl);
        setItems(result.items);
      } catch (e) {
        console.error("Remove from cart error:", e);
      } finally {
        setLoading(false);
      }
    },
    [cartId, setLoading, setCartId, setCheckoutUrl, setItems]
  );

  const qty   = totalQuantity();
  const total = totalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 z-100 backdrop-blur-sm"
          />

          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-101 flex flex-col bg-bg-dark border-l border-cyan shadow-[-20px_0_40px_rgba(0,245,255,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-dim">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-cyan" />
                <span className="font-display text-xs tracking-widest uppercase text-text-primary">
                  CARRITO
                </span>
                {qty > 0 && (
                  <span className="bg-pink text-bg-deep font-mono text-[0.6rem] font-bold px-2 py-0.5 min-w-[20px] text-center">
                    {qty}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-text-muted hover:text-cyan transition-colors p-1"
                aria-label="Cerrar carrito"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div
              className={cn(
                "flex-1 overflow-y-auto px-6 py-4",
                isLoading && "opacity-60 pointer-events-none"
              )}
            >
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                  <div className="w-16 h-16 border border-border-dim flex items-center justify-center">
                    <ShoppingBag size={28} className="text-text-dim" />
                  </div>
                  <div>
                    <p className="font-display text-xs tracking-widest uppercase text-text-muted mb-2">
                      TU CARRITO ESTÁ VACÍO
                    </p>
                    <p className="font-mono text-xs text-text-dim">
                      {"// Agrega productos para comenzar"}
                    </p>
                  </div>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="btn-cyber-primary"
                  >
                    <span>EXPLORAR PRODUCTOS</span>
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li
                      key={item.lineId}
                      className="flex gap-3 pb-4 border-b border-border-dim last:border-0"
                    >
                      <Link
                        href={`/products/${item.handle}`}
                        onClick={closeCart}
                        className="shrink-0 w-16 h-16 relative overflow-hidden border border-border-dim hover:border-border-cyan transition-colors"
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full bg-bg-card" />
                        )}
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.handle}`}
                          onClick={closeCart}
                          className="font-display text-[0.65rem] tracking-widest uppercase text-text-primary hover:text-cyan transition-colors line-clamp-2 block"
                        >
                          {item.title}
                        </Link>
                        {item.variantTitle !== "Default Title" && (
                          <p className="font-mono text-[0.6rem] text-text-dim mt-0.5">
                            {item.variantTitle}
                          </p>
                        )}
                        <p className="font-mono text-xs text-cyan mt-1">
                          {formatPrice(
                            parseFloat(item.price) / item.quantity,
                            item.currencyCode
                          )}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.lineId,
                                Math.max(0, item.quantity - 1)
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center border border-border-dim text-text-muted hover:border-cyan hover:text-cyan transition-colors"
                            aria-label="Reducir cantidad"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-mono text-xs text-text-primary w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.lineId, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center border border-border-dim text-text-muted hover:border-cyan hover:text-cyan transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={10} />
                          </button>
                          <button
                            onClick={() => handleRemove(item.lineId)}
                            className="ml-auto text-text-dim hover:text-red-400 transition-colors"
                            aria-label="Eliminar"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-4 border-t border-cyan bg-bg-card">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
                    TOTAL
                  </span>
                  <span className="font-mono text-xl text-cyan text-neon-cyan">
                    {formatPrice(total, items[0]?.currencyCode ?? "USD")}
                  </span>
                </div>
                <p className="font-mono text-[0.6rem] text-text-dim mb-4">
                  {"// Impuestos y envío calculados al finalizar"}
                </p>
                {checkoutUrl ? (
                  <a
                    href={checkoutUrl}
                    className="btn-cyber-primary w-full flex items-center justify-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>FINALIZAR COMPRA</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <button className="btn-cyber-primary w-full opacity-50" disabled>
                    <span>SIN CHECKOUT</span>
                  </button>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
