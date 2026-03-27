import Link from "next/link";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { HexGrid } from "@/components/cyberpunk/HexGrid";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden bg-grid">
      <HexGrid opacity={0.04} />

      <div className="relative z-10 text-center">
        <p className="font-mono text-xs text-text-dim tracking-widest mb-4">
          // ERROR_404 — RUTA NO ENCONTRADA
        </p>

        <div className="font-display font-black mb-6">
          <GlitchText text="404" color="pink" className="text-[10rem] leading-none" />
        </div>

        <h1 className="font-display text-xl font-bold tracking-widest uppercase text-text-primary mb-4">
          SECTOR NO ENCONTRADO
        </h1>
        <p className="font-mono text-sm text-text-muted max-w-sm mx-auto mb-10">
          La ruta que buscas no existe en el grid. <br />
          Puede que haya sido movida o eliminada.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-cyber-primary">
            <span>VOLVER AL INICIO</span>
          </Link>
          <Link href="/products" className="btn-cyber-secondary">
            <span>VER PRODUCTOS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
