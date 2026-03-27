import { RegisterForm } from "./RegisterForm";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { HexGrid } from "@/components/cyberpunk/HexGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Cuenta",
  description: "Únete a NEONTECH y accede a lo mejor en tecnología.",
};

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-grid overflow-hidden">
      <HexGrid opacity={0.04} />
      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-mono text-xs text-pink tracking-widest mb-3">
            // NUEVO AGENTE
          </p>
          <GlitchText text="REGISTRARSE" as="h1" color="pink" className="text-3xl font-black" />
          <p className="font-mono text-xs text-text-dim mt-3">
            Crea tu cuenta y únete al grid
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
