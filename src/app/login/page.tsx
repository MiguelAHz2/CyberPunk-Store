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
        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-mono text-xs text-cyan tracking-widest mb-3">
            // AUTENTICACIÓN REQUERIDA
          </p>
          <GlitchText text="ACCEDER" as="h1" color="cyan" className="text-4xl font-black" />
          <p className="font-mono text-xs text-text-dim mt-3">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
