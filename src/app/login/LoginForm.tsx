"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function translateAuthError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("email not confirmed"))
    return "EMAIL_NOT_CONFIRMED";
  if (m.includes("invalid login") || m.includes("invalid credentials") || m.includes("wrong password"))
    return "Email o contraseña incorrectos";
  if (m.includes("too many requests") || m.includes("rate limit"))
    return "Demasiados intentos. Espera unos minutos e intenta de nuevo.";
  if (m.includes("user not found"))
    return "No existe una cuenta con ese email";
  return "Error al iniciar sesión. Inténtalo de nuevo.";
}

export function LoginForm() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [resending, setResending] = useState(false);
  const [resendOk,  setResendOk]  = useState(false);

  const isEmailNotConfirmed = error === "EMAIL_NOT_CONFIRMED";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(translateAuthError(authError.message));
      setLoading(false);
      return;
    }

    router.push("/account");
    router.refresh();
  };

  const handleResendConfirmation = async () => {
    if (!email) return;
    setResending(true);
    const supabase = createClient();
    await supabase.auth.resend({ type: "signup", email });
    setResending(false);
    setResendOk(true);
    setTimeout(() => setResendOk(false), 5000);
  };

  return (
    <div className="border border-border-cyan shadow-[0_0_20px_var(--cyan-glow)] bg-bg-card p-8">
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="usuario@neontech.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={14} />}
          required
          autoComplete="email"
        />
        <Input
          id="password"
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={14} />}
          required
          autoComplete="current-password"
        />

        {/* Error: email no confirmado */}
        {isEmailNotConfirmed && (
          <div className="border border-yellow-500/40 bg-yellow-500/10 px-3 py-3 flex flex-col gap-2">
            <p className="font-mono text-xs text-yellow-400">
              ⚠ Debes confirmar tu email antes de iniciar sesión.
            </p>
            <p className="font-mono text-[0.65rem] text-text-dim">
              Revisa tu bandeja de entrada (y la carpeta de spam).
            </p>
            {resendOk ? (
              <p className="font-mono text-[0.65rem] text-green-400">
                ✓ Email de confirmación reenviado.
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendConfirmation}
                disabled={resending || !email}
                className="self-start flex items-center gap-1.5 font-mono text-[0.65rem] text-cyan hover:underline disabled:opacity-50 transition-colors"
              >
                <RefreshCw size={10} className={resending ? "animate-spin" : ""} />
                {resending ? "Reenviando..." : "Reenviar email de confirmación"}
              </button>
            )}
          </div>
        )}

        {/* Error genérico */}
        {error && !isEmailNotConfirmed && (
          <p className="font-mono text-xs text-red-400 border border-red-500/30 bg-red-500/10 px-3 py-2">
            ⚠ {error}
          </p>
        )}

        <Button type="submit" loading={loading} fullWidth size="lg">
          INICIAR SESIÓN
        </Button>
      </form>

      <div
        className="h-px my-6"
        style={{
          background: "linear-gradient(90deg, transparent, var(--border-dim), transparent)",
        }}
      />

      <p className="font-mono text-xs text-center text-text-muted">
        ¿Sin cuenta?{" "}
        <Link href="/register" className="text-cyan hover:underline transition-colors">
          CREAR CUENTA
        </Link>
      </p>
    </div>
  );
}
