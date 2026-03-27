"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [success,  setSuccess]  = useState(false);
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/account`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="border border-border-cyan bg-bg-card p-8 text-center">
        <div className="w-12 h-12 border border-cyan flex items-center justify-center mx-auto mb-4">
          <span className="text-cyan text-xl">✓</span>
        </div>
        <p className="font-display text-xs tracking-widest uppercase text-cyan mb-2">
          CUENTA CREADA
        </p>
        <p className="font-mono text-xs text-text-muted">
          Revisa tu email para confirmar tu cuenta
        </p>
        <Link href="/login" className="block mt-6 btn-cyber-primary">
          <span>IR AL LOGIN</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative border border-border-pink shadow-[0_0_20px_var(--pink-glow)] bg-bg-card p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="name"
          type="text"
          label="Nombre completo"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<User size={14} />}
          required
        />
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
          placeholder="Mínimo 8 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={14} />}
          required
          autoComplete="new-password"
        />
        <Input
          id="confirm"
          type="password"
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          icon={<Lock size={14} />}
          required
          autoComplete="new-password"
        />

        {error && (
          <p className="font-mono text-xs text-red-400 border border-red-500/30 bg-red-500/10 px-3 py-2">
            ⚠ {error}
          </p>
        )}

        <Button type="submit" variant="secondary" loading={loading} fullWidth size="lg" className="mt-1">
          CREAR CUENTA
        </Button>
      </form>

      <div
        className="h-px my-6"
        style={{
          background: "linear-gradient(90deg, transparent, var(--border-dim), transparent)",
        }}
      />

      <p className="font-mono text-xs text-center text-text-muted">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-pink hover:underline transition-colors">
          INICIAR SESIÓN
        </Link>
      </p>
    </div>
  );
}
