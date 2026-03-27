"use client";

import { useState, useTransition } from "react";
import { Lock, Eye, EyeOff, Check } from "lucide-react";
import { changePassword } from "./actions";

export function ChangePasswordForm() {
  const [current,  setCurrent]  = useState("");
  const [next,     setNext]     = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [msg,      setMsg]      = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, start]      = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (next !== confirm) {
      setMsg({ type: "error", text: "Las contraseñas no coinciden" });
      return;
    }
    if (next.length < 6) {
      setMsg({ type: "error", text: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }
    start(async () => {
      const result = await changePassword({ current, newPassword: next });
      setMsg(result);
      if (result.type === "success") {
        setCurrent(""); setNext(""); setConfirm("");
        setTimeout(() => setMsg(null), 3000);
      }
    });
  };

  return (
    <section className="cyber-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lock size={14} className="text-pink" />
        <h2 className="font-display text-xs tracking-widest uppercase text-text-primary">
          Cambiar Contraseña
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {[
          { label: "Contraseña actual",   value: current,  setter: setCurrent },
          { label: "Nueva contraseña",    value: next,     setter: setNext },
          { label: "Confirmar contraseña", value: confirm, setter: setConfirm },
        ].map(({ label, value, setter }) => (
          <div key={label} className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-text-dim tracking-widest uppercase">
              {label}
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder="••••••••"
                className="cyber-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPwd((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-cyan transition-colors"
              >
                {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        ))}

        {msg && (
          <p
            className={`font-mono text-xs ${msg.type === "success" ? "text-green-400" : "text-red-400"}`}
          >
            {msg.type === "success" && <Check size={10} className="inline mr-1" />}
            {msg.text}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending || !current || !next || !confirm}
          className="btn-cyber-danger self-start disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isPending ? "CAMBIANDO..." : "CAMBIAR CONTRASEÑA"}</span>
        </button>
      </form>
    </section>
  );
}
