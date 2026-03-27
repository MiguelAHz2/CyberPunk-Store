import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { HexGrid } from "@/components/cyberpunk/HexGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Accede a tu cuenta NEONTECH.",
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-grid overflow-hidden">
      <HexGrid opacity={0.04} />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-mono text-xs text-cyan tracking-widest mb-3">
            {"// AUTENTICACIÓN REQUERIDA"}
          </p>
          <GlitchText text="ACCEDER" as="h1" color="cyan" className="text-4xl font-black" />
          <p className="font-mono text-xs text-text-dim mt-3">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <Suspense fallback={
          <div className="border border-border-cyan bg-bg-card p-8 animate-pulse">
            <div className="h-10 bg-bg-card-hover mb-4" />
            <div className="h-10 bg-bg-card-hover mb-4" />
            <div className="h-10 bg-bg-card-hover" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
