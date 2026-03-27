import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { LogoutButton } from "./LogoutButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Cuenta",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const displayName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Agente";
  const initials    = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="font-mono text-xs text-cyan tracking-widest mb-2">
          // PANEL DE CONTROL
        </p>
        <GlitchText text="MI CUENTA" as="h1" color="cyan" className="text-4xl font-black" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="lg:col-span-1">
          <div className="border border-border-cyan bg-bg-card p-6 shadow-[0_0_15px_var(--cyan-glow)]">
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-dim">
              <div className="w-14 h-14 flex items-center justify-center border-2 border-cyan bg-[rgba(0,245,255,0.08)] font-display text-lg font-bold text-cyan">
                {initials}
              </div>
              <div>
                <p className="font-display text-sm font-bold tracking-widest uppercase text-text-primary">
                  {displayName}
                </p>
                <p className="font-mono text-[0.65rem] text-text-dim">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_6px_var(--cyan)]" />
              <span className="font-mono text-[0.65rem] text-cyan tracking-widest">
                AGENTE ACTIVO
              </span>
            </div>

            <nav className="flex flex-col gap-1">
              {[
                { label: "Mis Pedidos",  href: "/account/orders" },
                { label: "Wishlist",     href: "/account/wishlist" },
                { label: "Configuración", href: "/account/settings" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 px-3 py-2 font-mono text-xs text-text-muted hover:text-cyan hover:bg-[rgba(0,245,255,0.04)] transition-all border-l-2 border-transparent hover:border-cyan"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-border-dim">
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Info */}
          <div className="border border-border-dim bg-bg-card p-6">
            <h2 className="font-display text-[0.7rem] tracking-widest uppercase text-cyan mb-4">
              Información de cuenta
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "ID",        value: user.id.slice(0, 8) + "..." },
                { label: "Proveedor", value: user.app_metadata?.provider ?? "email" },
                { label: "Creado",    value: new Date(user.created_at).toLocaleDateString("es-CO") },
                { label: "Estado",    value: user.email_confirmed_at ? "Verificado" : "Pendiente" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[0.6rem] text-text-dim tracking-widest uppercase mb-0.5">
                    {label}
                  </p>
                  <p className="font-mono text-xs text-text-primary">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Ver mis pedidos",  href: "/account/orders",   color: "cyan"   },
              { label: "Mi wishlist",      href: "/account/wishlist",  color: "pink"   },
              { label: "Explorar tienda",  href: "/products",          color: "purple" },
              { label: "Ofertas activas",  href: "/products?sortKey=PRICE", color: "yellow" },
            ].map(({ label, href, color }) => (
              <Link
                key={href}
                href={href}
                className={`border p-4 font-display text-[0.65rem] tracking-widest uppercase transition-all duration-200
                  ${color === "cyan"   ? "border-border-dim hover:border-cyan   hover:text-cyan   hover:shadow-[0_0_10px_var(--cyan-glow)]" : ""}
                  ${color === "pink"   ? "border-border-dim hover:border-pink   hover:text-pink   hover:shadow-[0_0_10px_var(--pink-glow)]" : ""}
                  ${color === "purple" ? "border-border-dim hover:border-purple hover:text-purple hover:shadow-[0_0_10px_var(--purple-glow)]" : ""}
                  ${color === "yellow" ? "border-border-dim hover:border-yellow hover:text-yellow" : ""}
                  text-text-muted
                `}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
