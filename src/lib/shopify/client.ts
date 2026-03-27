import { ShopifyError } from "./types";

const domain   = process.env.SHOPIFY_STORE_DOMAIN;
const token    = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const endpoint = domain
  ? `https://${domain}/api/2024-10/graphql.json`
  : null;

export function isShopifyConfigured(): boolean {
  return Boolean(domain && token);
}

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number;
}

interface ShopifyResponse<T> {
  data?: T;
  errors?: ShopifyError[];
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
  revalidate,
}: ShopifyFetchOptions): Promise<T> {
  if (!endpoint || !token) {
    throw new Error(
      "Shopify no configurado. Agrega SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN en .env.local"
    );
  }

  const nextConfig: { revalidate?: number; tags?: string[] } = {};
  if (revalidate !== undefined) nextConfig.revalidate = revalidate;
  if (tags?.length)              nextConfig.tags = tags;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type":                      "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    ...(revalidate !== undefined
      ? { next: nextConfig }
      : {
          cache,
          ...(Object.keys(nextConfig).length ? { next: nextConfig } : {}),
        }),
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json: ShopifyResponse<T> = await res.json();

  if (json.errors?.length) {
    const msg = json.errors.map((e) => e.message).join(", ");
    throw new Error(`Shopify GraphQL error: ${msg}`);
  }

  if (!json.data) {
    throw new Error("No data returned from Shopify API");
  }

  return json.data;
}
