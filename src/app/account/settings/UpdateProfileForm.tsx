"use client";

import { useState, useTransition } from "react";
import { User, Check } from "lucide-react";
import { updateProfile } from "./actions";

interface Props {
  currentName: string;
  userId:      string;
}

export function UpdateProfileForm({ currentName }: Props) {
  const [name, setName]   = useState(currentName);
  const [msg,  setMsg]    = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, start] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    start(async () => {
      const result = await updateProfile({ full_name: name });
      setMsg(result);
      if (result.type === "success") setTimeout(() => setMsg(null), 3000);
    });
  };

  return (
    <section className="cyber-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <User size={14} className="text-cyan" />
        <h2 className="font-display text-xs tracking-widest uppercase text-text-primary">
          Información Personal
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs text-text-dim tracking-widest uppercase">
            Nombre completo
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="cyber-input"
          />
        </div>

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
          disabled={isPending || name === currentName}
          className="btn-cyber-secondary self-start disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isPending ? "GUARDANDO..." : "GUARDAR CAMBIOS"}</span>
        </button>
      </form>
    </section>
  );
}
