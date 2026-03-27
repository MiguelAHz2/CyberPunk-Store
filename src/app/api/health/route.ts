import { NextResponse } from "next/server";
import { shopifyFetch, isShopifyConfigured } from "@/lib/shopify/client";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const results = {
    timestamp: new Date().toISOString(),
    shopify:   { ok: false, message: "", products: [] as object[] },
    supabase:  { ok: false, message: "" },
  };

  // ── Test Shopify ──────────────────────────────────────────
  if (!isShopifyConfigured()) {
    results.shopify.message = "Variables de entorno no configuradas";
  } else {
    try {
      const data = await shopifyFetch<{
        products: {
          edges: {
            node: {
              id: string;
              title: string;
              handle: string;
              status: string;
              availableForSale: boolean;
              publishedAt: string | null;
              priceRange: { minVariantPrice: { amount: string } };
              images: { edges: { node: { url: string } }[] };
            };
          }[];
        };
      }>({
        query: `{
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                availableForSale
                publishedAt
                priceRange {
                  minVariantPrice { amount currencyCode }
                }
                images(first: 1) {
                  edges { node { url } }
                }
              }
            }
          }
        }`,
        cache: "no-store",
      });

      results.shopify.ok       = true;
      results.shopify.message  = `${data.products.edges.length} productos en Shopify`;
      results.shopify.products = data.products.edges.map((e) => ({
        title:           e.node.title,
        handle:          e.node.handle,
        availableForSale: e.node.availableForSale,
        publishedAt:     e.node.publishedAt,
        price:           e.node.priceRange.minVariantPrice.amount,
        currency:        (e.node.priceRange.minVariantPrice as { amount: string; currencyCode: string }).currencyCode,
        hasImage:        e.node.images.edges.length > 0,
      }));
    } catch (e) {
      results.shopify.message = e instanceof Error ? e.message : "Error desconocido";
    }
  }

  // ── Test Supabase ─────────────────────────────────────────
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("profiles").select("id").limit(1);
    if (error) throw error;
    results.supabase.ok      = true;
    results.supabase.message = "Conectado";
  } catch (e) {
    results.supabase.message = e instanceof Error ? e.message : "Error desconocido";
  }

  return NextResponse.json(results, { status: 200, headers: { "Content-Type": "application/json" } });
}
