"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface WishlistItem {
  id:            string;
  product_id:    string;
  product_handle: string;
  product_title: string;
  product_image: string | null;
  product_price: string | null;
  currency_code: string;
  created_at:    string;
}

export async function getWishlist(): Promise<WishlistItem[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("wishlists")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getWishlist error:", error);
    return [];
  }
  return data ?? [];
}

export async function isInWishlist(productId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  return Boolean(data);
}

export async function toggleWishlist(item: {
  product_id:    string;
  product_handle: string;
  product_title: string;
  product_image: string | null;
  product_price: string | null;
  currency_code: string;
}): Promise<{ inWishlist: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { inWishlist: false, error: "Debes iniciar sesión para usar la wishlist" };
  }

  const { data: existing } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", item.product_id)
    .single();

  if (existing) {
    await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", item.product_id);

    revalidatePath("/account/wishlist");
    return { inWishlist: false };
  } else {
    await supabase
      .from("wishlists")
      .insert({ user_id: user.id, ...item });

    revalidatePath("/account/wishlist");
    return { inWishlist: true };
  }
}
