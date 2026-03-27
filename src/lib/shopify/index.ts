import { shopifyFetch } from "./client";
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_FEATURED_PRODUCTS_QUERY,
  SEARCH_PRODUCTS_QUERY,
} from "./queries/products";
import {
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
} from "./queries/collections";
import {
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
} from "./queries/cart";
import type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
  Connection,
} from "./types";

// ─── Helpers ────────────────────────────────────────────────
function flattenEdges<T>(connection: Connection<T>): T[] {
  return connection.edges.map((e) => e.node);
}

// ─── Products ───────────────────────────────────────────────
export async function getProducts({
  first = 20,
  after,
  query,
  sortKey,
  reverse,
}: {
  first?: number;
  after?: string;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
} = {}) {
  const data = await shopifyFetch<{
    products: Connection<ShopifyProduct> & { pageInfo: unknown };
  }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first, after, query, sortKey, reverse },
    revalidate: 60,
    tags: ["products"],
  });
  return {
    products: flattenEdges(data.products),
    pageInfo: data.products.pageInfo,
  };
}

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    revalidate: 60,
    tags: [`product-${handle}`],
  });
  return data.product;
}

export async function getFeaturedProducts(first = 8) {
  const data = await shopifyFetch<{ products: Connection<ShopifyProduct> }>({
    query: GET_FEATURED_PRODUCTS_QUERY,
    variables: { first },
    revalidate: 300,
    tags: ["featured-products"],
  });
  return flattenEdges(data.products);
}

export async function searchProducts(query: string, first = 12) {
  const data = await shopifyFetch<{ products: Connection<ShopifyProduct> }>({
    query: SEARCH_PRODUCTS_QUERY,
    variables: { query, first },
    cache: "no-store",
  });
  return flattenEdges(data.products);
}

// ─── Collections ────────────────────────────────────────────
export async function getCollections(first = 20) {
  const data = await shopifyFetch<{
    collections: Connection<ShopifyCollection>;
  }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first },
    revalidate: 300,
    tags: ["collections"],
  });
  return flattenEdges(data.collections);
}

export async function getCollectionProducts(
  handle: string,
  {
    first = 20,
    after,
    sortKey,
    reverse,
  }: {
    first?: number;
    after?: string;
    sortKey?: string;
    reverse?: boolean;
  } = {}
) {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
    query: GET_COLLECTION_PRODUCTS_QUERY,
    variables: { handle, first, after, sortKey, reverse },
    revalidate: 60,
    tags: [`collection-${handle}`],
  });
  if (!data.collection) return null;
  return {
    collection: { ...data.collection, products: undefined },
    products: flattenEdges(data.collection.products),
    pageInfo: data.collection.products.pageInfo,
  };
}

// ─── Cart ────────────────────────────────────────────────────
export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = []
) {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart };
  }>({
    query: CREATE_CART_MUTATION,
    variables: { lines },
    cache: "no-store",
  });
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
) {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart };
  }>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
) {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart };
  }>({
    query: UPDATE_CART_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });
  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart };
  }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { cartId, lineIds },
    cache: "no-store",
  });
  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string) {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart;
}
