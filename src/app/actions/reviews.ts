"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface Review {
  id:             string;
  user_id:        string;
  product_id:     string;
  product_handle: string;
  rating:         number;
  title:          string | null;
  body:           string | null;
  verified:       boolean;
  created_at:     string;
  profiles:       { full_name: string | null } | null;
}

export interface ProductRating {
  avg_rating:   number;
  review_count: number;
}

export async function getReviews(productId: string): Promise<Review[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*, profiles(full_name)")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getReviews error:", error.message);
    // Si falla el join con profiles, intentar sin él
    const { data: fallback } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    return ((fallback ?? []) as Review[]).map((r) => ({ ...r, profiles: null }));
  }
  return (data ?? []) as Review[];
}

export async function getProductRating(productId: string): Promise<ProductRating | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("product_ratings")
    .select("avg_rating, review_count")
    .eq("product_id", productId)
    .single();
  return data as ProductRating | null;
}

export async function getUserReview(productId: string): Promise<Review | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("reviews")
    .select("*, profiles(full_name)")
    .eq("product_id", productId)
    .eq("user_id", user.id)
    .single();
  return (data as Review) ?? null;
}

export async function submitReview(data: {
  product_id:     string;
  product_handle: string;
  rating:         number;
  title:          string;
  body:           string;
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { ok: false, error: "Debes iniciar sesión para dejar una reseña" };
  if (data.rating < 1 || data.rating > 5) return { ok: false, error: "Rating inválido" };

  const { error } = await supabase
    .from("reviews")
    .upsert({
      user_id:        user.id,
      product_id:     data.product_id,
      product_handle: data.product_handle,
      rating:         data.rating,
      title:          data.title.trim() || null,
      body:           data.body.trim()  || null,
      updated_at:     new Date().toISOString(),
    }, { onConflict: "user_id,product_id" });

  if (error) return { ok: false, error: error.message };

  revalidatePath(`/products/${data.product_handle}`);
  return { ok: true };
}

export async function deleteReview(productHandle: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No autenticado" };

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("user_id", user.id)
    .eq("product_handle", productHandle);

  if (error) return { ok: false, error: error.message };

  revalidatePath(`/products/${productHandle}`);
  return { ok: true };
}
