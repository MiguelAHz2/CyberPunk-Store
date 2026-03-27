"use client";

import { useState, useMemo } from "react";
import { Share2 } from "lucide-react";
import { VariantSelector } from "@/components/shop/VariantSelector";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { WishlistButton } from "@/components/shop/WishlistButton";
import type { ShopifyProductVariant, ShopifyProductOption } from "@/lib/shopify/types";

interface ProductDetailClientProps {
  variants:         ShopifyProductVariant[];
  options:          ShopifyProductOption[];
  defaultOptions:   Record<string, string>;
  availableForSale: boolean;
  productId:        string;
  handle:           string;
  title:            string;
  image:            string | null;
  price:            string | null;
  currencyCode:     string;
  initialWishlist:  boolean;
}

export function ProductDetailClient({
  variants,
  options,
  defaultOptions,
  availableForSale,
  productId,
  handle,
  title,
  image,
  price,
  currencyCode,
  initialWishlist,
}: ProductDetailClientProps) {
  const [selectedOptions, setSelectedOptions] =
    useState<Record<string, string>>(defaultOptions);

  const selectedVariant = useMemo<ShopifyProductVariant | null>(() => {
    return (
      variants.find((v) =>
        v.selectedOptions.every(
          ({ name, value }) => selectedOptions[name] === value
        )
      ) ?? null
    );
  }, [variants, selectedOptions]);

  const handleShare = () => {
    if (typeof window === "undefined") return;
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <VariantSelector
        options={options}
        variants={variants}
        selectedOptions={selectedOptions}
        onOptionChange={(name, value) =>
          setSelectedOptions((prev) => ({ ...prev, [name]: value }))
        }
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <AddToCartButton
            selectedVariant={selectedVariant}
            availableForSale={
              availableForSale && (selectedVariant?.availableForSale ?? true)
            }
          />
        </div>

        <WishlistButton
          productId={productId}
          handle={handle}
          title={title}
          image={image}
          price={price}
          currencyCode={currencyCode}
          initialState={initialWishlist}
        />

        <button
          onClick={handleShare}
          className="p-3 border border-border-dim text-text-muted hover:border-cyan hover:text-cyan transition-all"
          aria-label="Compartir producto"
        >
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
}
