import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Heart, ShoppingCart } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getWishlist } from "@/app/actions/wishlist";
import { formatPrice } from "@/lib/utils";
import { RemoveFromWishlistButton } from "./RemoveFromWishlistButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mi Wishlist" };

export default async function WishlistPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const items = await getWishlist();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-1 font-mono text-xs text-text-dim mb-8">
        <Link href="/account" className="hover:text-cyan transition-colors">
          Mi Cuenta
        </Link>
        <ChevronRight size={10} />
        <span className="text-text-muted">Wishlist</span>
      </nav>

      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="font-mono text-xs text-pink tracking-widest mb-2">
            {"// LISTA DE DESEOS"}
          </p>
          <h1 className="font-display text-3xl font-bold uppercase text-text-primary">
            Mi Wishlist
          </h1>
        </div>
        {items.length > 0 && (
          <span className="font-mono text-xs text-text-dim">
            {items.length} producto{items.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="border border-border-dim bg-bg-card p-16 text-center">
          <div className="w-16 h-16 border border-border-dim flex items-center justify-center mx-auto mb-6">
            <Heart size={28} className="text-text-dim" />
          </div>
          <p className="font-display text-xs tracking-widest uppercase text-text-muted mb-2">
            WISHLIST VACÍA
          </p>
          <p className="font-mono text-xs text-text-dim mb-6">
            {"// Guarda tus productos favoritos aquí"}
          </p>
          <Link href="/products" className="btn-cyber-secondary">
            <span>EXPLORAR PRODUCTOS</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="cyber-card flex gap-4 p-4 group"
            >
              {/* Image */}
              <Link
                href={`/products/${item.product_handle}`}
                className="shrink-0 w-20 h-20 relative overflow-hidden border border-border-dim group-hover:border-border-cyan transition-colors"
              >
                {item.product_image ? (
                  <Image
                    src={item.product_image}
                    alt={item.product_title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full bg-bg-dark flex items-center justify-center">
                    <Heart size={16} className="text-text-dim" />
                  </div>
                )}
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/products/${item.product_handle}`}
                    className="font-display text-[0.65rem] tracking-widest uppercase text-text-primary hover:text-cyan transition-colors line-clamp-2 block"
                  >
                    {item.product_title}
                  </Link>
                  {item.product_price && (
                    <p className="font-mono text-sm text-cyan mt-1">
                      {formatPrice(item.product_price, item.currency_code)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Link
                    href={`/products/${item.product_handle}`}
                    className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-widest uppercase text-text-muted hover:text-cyan border border-border-dim hover:border-cyan px-3 py-1.5 transition-all"
                  >
                    <ShoppingCart size={10} />
                    VER PRODUCTO
                  </Link>
                  <RemoveFromWishlistButton productId={item.product_id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
