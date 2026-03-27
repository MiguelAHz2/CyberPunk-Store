"use client";

import { useState, useTransition } from "react";
import { Send, Check } from "lucide-react";

type FormState = "idle" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [isPending, start] = useTransition();
  const [form, setForm] = useState({
    name:    "",
    email:   "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    start(async () => {
      await new Promise((r) => setTimeout(r, 1200));
      setState("success");
    });
  };

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-4 text-center">
        <div className="w-14 h-14 border border-cyan flex items-center justify-center">
          <Check size={24} className="text-cyan" />
        </div>
        <p className="font-display text-xs tracking-widest uppercase text-cyan">
          MENSAJE ENVIADO
        </p>
        <p className="font-mono text-xs text-text-muted">
          {"// Te responderemos pronto. Gracias por contactarnos."}
        </p>
        <button
          onClick={() => { setState("idle"); setForm({ name:"", email:"", subject:"", message:"" }); }}
          className="btn-cyber-secondary mt-2"
        >
          <span>NUEVO MENSAJE</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <p className="font-mono text-xs text-text-dim mb-2">
        {"// Completa el formulario y te contactamos"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[0.65rem] tracking-widest uppercase text-text-dim">
            Nombre *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
            className="cyber-input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[0.65rem] tracking-widest uppercase text-text-dim">
            Email *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
            className="cyber-input"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[0.65rem] tracking-widest uppercase text-text-dim">
          Asunto
        </label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="cyber-input"
        >
          <option value="">Selecciona un asunto</option>
          <option value="order">Consulta sobre pedido</option>
          <option value="product">Información de producto</option>
          <option value="return">Devolución / cambio</option>
          <option value="technical">Soporte técnico</option>
          <option value="other">Otro</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[0.65rem] tracking-widest uppercase text-text-dim">
          Mensaje *
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Describe tu consulta..."
          className="cyber-input resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn-cyber-primary self-start flex items-center gap-2 disabled:opacity-50"
      >
        <Send size={12} />
        <span>{isPending ? "ENVIANDO..." : "ENVIAR MENSAJE"}</span>
      </button>
    </form>
  );
}
