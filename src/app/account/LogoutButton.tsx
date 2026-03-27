"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/cart";

export function LogoutButton() {
  const router    = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    clearCart();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-2 font-mono text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-2 border border-transparent hover:border-red-500/30 transition-all"
    >
      <LogOut size={12} />
      CERRAR SESIÓN
    </button>
  );
}
