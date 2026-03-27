"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { ShopifyProductOption, ShopifyProductVariant } from "@/lib/shopify/types";

interface VariantSelectorProps {
  options: ShopifyProductOption[];
  variants: ShopifyProductVariant[];
  selectedOptions: Record<string, string>;
  onOptionChange: (name: string, value: string) => void;
}

export function VariantSelector({
  options,
  variants,
  selectedOptions,
  onOptionChange,
}: VariantSelectorProps) {
  const isOptionAvailable = useCallback(
    (optionName: string, optionValue: string) => {
      return variants.some((v) => {
        if (!v.availableForSale) return false;
        return v.selectedOptions.every(({ name, value }) => {
          if (name === optionName) return value === optionValue;
          return selectedOptions[name] === value;
        });
      });
    },
    [variants, selectedOptions]
  );

  if (options.length === 1 && options[0].values.length === 1) return null;

  return (
    <div className="flex flex-col gap-5">
      {options.map((option) => (
        <div key={option.id}>
          <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
            {option.name}:{" "}
            <span className="text-cyan">
              {selectedOptions[option.name]}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const selected  = selectedOptions[option.name] === value;
              const available = isOptionAvailable(option.name, value);

              return (
                <button
                  key={value}
                  onClick={() => available && onOptionChange(option.name, value)}
                  disabled={!available}
                  className={cn(
                    "relative px-3 py-1.5 font-mono text-xs tracking-widest border transition-all duration-200",
                    selected
                      ? "border-cyan text-cyan shadow-[0_0_8px_var(--cyan-glow)] bg-[rgba(0,245,255,0.06)]"
                      : available
                      ? "border-border-dim text-text-muted hover:border-border-cyan hover:text-text-primary"
                      : "border-border-dim text-text-dim opacity-40 cursor-not-allowed line-through"
                  )}
                >
                  {value}
                  {!available && (
                    <span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to bottom right, transparent calc(50% - 0.5px), rgba(107,143,163,0.3) 50%, transparent calc(50% + 0.5px))",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
