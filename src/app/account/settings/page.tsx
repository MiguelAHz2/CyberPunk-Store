import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { UpdateProfileForm } from "./UpdateProfileForm";
import { ChangePasswordForm } from "./ChangePasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Configuración de Cuenta" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-1 font-mono text-xs text-text-dim mb-8">
        <Link href="/account" className="hover:text-cyan transition-colors">
          Mi Cuenta
        </Link>
        <ChevronRight size={10} />
        <span className="text-text-muted">Configuración</span>
      </nav>

      <div className="mb-10">
        <p className="font-mono text-xs text-cyan tracking-widest mb-2">
          {"// CONFIGURACIÓN"}
        </p>
        <h1 className="font-display text-3xl font-bold uppercase text-text-primary">
          Mi Cuenta
        </h1>
        <p className="font-mono text-xs text-text-dim mt-2">
          Correo: <span className="text-text-muted">{user.email}</span>
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <UpdateProfileForm
          currentName={profile?.full_name ?? ""}
          userId={user.id}
        />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
