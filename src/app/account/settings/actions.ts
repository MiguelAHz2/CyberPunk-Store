"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(data: {
  full_name: string;
}): Promise<{ type: "success" | "error"; text: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { type: "error", text: "No autenticado" };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: data.full_name, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (error) return { type: "error", text: error.message };

  revalidatePath("/account");
  revalidatePath("/account/settings");
  return { type: "success", text: "Perfil actualizado correctamente" };
}

export async function changePassword(data: {
  current:     string;
  newPassword: string;
}): Promise<{ type: "success" | "error"; text: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) return { type: "error", text: "No autenticado" };

  // Verify current password by re-signing in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email:    user.email,
    password: data.current,
  });

  if (signInError) {
    return { type: "error", text: "La contraseña actual es incorrecta" };
  }

  const { error } = await supabase.auth.updateUser({ password: data.newPassword });

  if (error) return { type: "error", text: error.message };

  return { type: "success", text: "Contraseña cambiada correctamente" };
}
