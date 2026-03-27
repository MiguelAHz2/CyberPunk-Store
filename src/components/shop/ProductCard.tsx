import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { ShopifyProduct } from "@/lib/shopify/types";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const price      = product.priceRange.minVariantPrice;
  const compareAt  = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const discount = hasDiscount
    ? Math.round(
        ((parseFloat(compareAt!.amount) - parseFloat(price.amount)) /
          parseFloat(compareAt!.amount)) *
          100
      )
    : 0;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      aria-label={product.title}
    >
      <div className="cyber-card relative overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-bg-dark">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-grid-dense">
              <span className="font-mono text-xs text-text-dim">
                NO IMAGE
              </span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-bg-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <div className="p-2 border border-cyan text-cyan hover:bg-cyan hover:text-bg-deep transition-colors">
              <Eye size={16} />
            </div>
            <div className="p-2 border border-pink text-pink hover:bg-pink hover:text-bg-deep transition-colors">
              <ShoppingCart size={16} />
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {!product.availableForSale && (
              <Badge variant="dim">Agotado</Badge>
            )}
            {hasDiscount && (
              <Badge variant="pink">-{discount}%</Badge>
            )}
          </div>

          {/* Corner accent */}
          <div
            className="absolute bottom-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background:
                "linear-gradient(135deg, transparent 50%, var(--cyan) 50%)",
            }}
          />
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex gap-1 mb-2 flex-wrap">
              {product.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="dim" className="text-[0.55rem]">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h3 className="font-display text-xs tracking-widest uppercase text-text-primary group-hover:text-cyan transition-colors line-clamp-2 mb-2">
            {product.title}
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm text-cyan">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {hasDiscount && (
              <span className="font-mono text-xs text-text-dim line-through">
                {formatPrice(compareAt!.amount, compareAt!.currencyCode)}
              </span>
            )}
          </div>
        </div>

        {/* Bottom neon line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--cyan), transparent)",
          }}
        />
      </div>
    </Link>
  );
}
