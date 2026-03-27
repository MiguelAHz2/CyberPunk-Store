"use server";

import {
  createCart,
  addToCart,
  updateCartLines,
  removeFromCart,
} from "@/lib/shopify";
import type { ShopifyCart } from "@/lib/shopify/types";

function cartToItems(cart: ShopifyCart) {
  return cart.lines.edges.map((e) => ({
    lineId:       e.node.id,
    variantId:    e.node.merchandise.id,
    productId:    e.node.merchandise.product.id,
    handle:       e.node.merchandise.product.handle,
    title:        e.node.merchandise.product.title,
    variantTitle: e.node.merchandise.title,
    price:        e.node.cost.totalAmount.amount,
    currencyCode: e.node.cost.totalAmount.currencyCode,
    quantity:     e.node.quantity,
    image:        e.node.merchandise.product.featuredImage?.url ?? null,
  }));
}

export async function createCartAction(
  lines: { merchandiseId: string; quantity: number }[]
) {
  const cart = await createCart(lines);
  return {
    cartId:      cart.id,
    checkoutUrl: cart.checkoutUrl,
    items:       cartToItems(cart),
  };
}

export async function addToCartAction(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
) {
  const cart = await addToCart(cartId, lines);
  return {
    cartId:      cart.id,
    checkoutUrl: cart.checkoutUrl,
    items:       cartToItems(cart),
  };
}

export async function updateCartAction(
  cartId: string,
  lines: { id: string; quantity: number }[]
) {
  const cart = await updateCartLines(cartId, lines);
  return {
    cartId:      cart.id,
    checkoutUrl: cart.checkoutUrl,
    items:       cartToItems(cart),
  };
}

export async function removeFromCartAction(
  cartId: string,
  lineIds: string[]
) {
  const cart = await removeFromCart(cartId, lineIds);
  return {
    cartId:      cart.id,
    checkoutUrl: cart.checkoutUrl,
    items:       cartToItems(cart),
  };
}
