import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_FEATURED_PRODUCTS_QUERY } from "@/lib/shopify/queries/products";
import { GET_COLLECTIONS_QUERY } from "@/lib/shopify/queries/collections";
import type { ShopifyProduct, ShopifyCollection, Connection } from "@/lib/shopify/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {};

  // Test featured products (mismo query que usa la home)
  try {
    const data = await shopifyFetch<{ products: Connection<ShopifyProduct> }>({
      query: GET_FEATURED_PRODUCTS_QUERY,
      variables: { first: 8 },
      cache: "no-store",
    });
    results.featuredProducts = {
      ok:    true,
      count: data.products.edges.length,
      first: data.products.edges[0]?.node?.title ?? "ninguno",
    };
  } catch (e) {
    results.featuredProducts = {
      ok:    false,
      error: e instanceof Error ? e.message : String(e),
    };
  }

  // Test collections
  try {
    const data = await shopifyFetch<{ collections: Connection<ShopifyCollection> }>({
      query: GET_COLLECTIONS_QUERY,
      variables: { first: 6 },
      cache: "no-store",
    });
    results.collections = {
      ok:    true,
      count: data.collections.edges.length,
    };
  } catch (e) {
    results.collections = {
      ok:    false,
      error: e instanceof Error ? e.message : String(e),
    };
  }

  return NextResponse.json(results);
}
