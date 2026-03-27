import { ContactForm } from "./ContactForm";
import { Mail, MessageSquare, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | CYBERSTORE",
  description: "Contáctanos. Estamos en el grid 24/7.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-cyan tracking-widest mb-3">
            {"// CONTACTO.exe"}
          </p>
          <h1 className="font-display text-4xl font-black uppercase text-text-primary mb-4">
            Contáctanos
          </h1>
          <p className="font-mono text-sm text-text-muted">
            {"// Estamos en el grid 24/7. Respuesta en menos de 24 horas."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar info */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon:  Mail,
                color: "text-cyan",
                label: "EMAIL",
                value: "soporte@cyberstore.net",
              },
              {
                icon:  MessageSquare,
                color: "text-pink",
                label: "CHAT EN VIVO",
                value: "Disponible en el sitio",
              },
              {
                icon:  Clock,
                color: "text-purple",
                label: "HORARIO",
                value: "Lun–Vie 9AM–6PM",
              },
            ].map(({ icon: Icon, color, label, value }) => (
              <div key={label} className="cyber-card p-5 flex items-start gap-4">
                <Icon size={18} className={color} />
                <div>
                  <p className={`font-mono text-[0.6rem] tracking-widest uppercase ${color} mb-1`}>
                    {label}
                  </p>
                  <p className="font-mono text-xs text-text-muted">{value}</p>
                </div>
              </div>
            ))}

            <div className="cyber-card p-5 mt-2">
              <p className="font-mono text-[0.6rem] tracking-widest uppercase text-yellow mb-3">
                TIEMPO DE RESPUESTA
              </p>
              <div className="space-y-2">
                {[
                  { label: "Pedidos",       time: "< 2h"  },
                  { label: "Soporte",       time: "< 12h" },
                  { label: "Devoluciones",  time: "< 24h" },
                ].map(({ label, time }) => (
                  <div key={label} className="flex justify-between">
                    <span className="font-mono text-xs text-text-dim">{label}</span>
                    <span className="font-mono text-xs text-cyan">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 cyber-card p-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
