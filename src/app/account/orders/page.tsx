import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mis Pedidos" };

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-1 font-mono text-xs text-text-dim mb-8">
        <Link href="/account" className="hover:text-cyan transition-colors">Mi Cuenta</Link>
        <ChevronRight size={10} />
        <span className="text-text-muted">Pedidos</span>
      </nav>

      <div className="mb-8">
        <p className="font-mono text-xs text-cyan tracking-widest mb-2">// HISTORIAL</p>
        <h1 className="font-display text-3xl font-bold uppercase text-text-primary">Mis Pedidos</h1>
      </div>

      {/* Empty state — orders come from Shopify Customer API */}
      <div className="border border-border-dim bg-bg-card p-16 text-center">
        <div className="w-16 h-16 border border-border-dim flex items-center justify-center mx-auto mb-6">
          <Package size={28} className="text-text-dim" />
        </div>
        <p className="font-display text-xs tracking-widest uppercase text-text-muted mb-2">
          SIN PEDIDOS
        </p>
        <p className="font-mono text-xs text-text-dim mb-6">
          // Aquí aparecerán tus pedidos una vez que realices tu primera compra
        </p>
        <Link href="/products" className="btn-cyber-primary">
          <span>EXPLORAR PRODUCTOS</span>
        </Link>
      </div>
    </div>
  );
}
