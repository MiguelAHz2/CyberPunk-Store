"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "PEDIDOS",
    color:    "text-cyan",
    items: [
      {
        q: "¿Cuánto tiempo tarda en llegar mi pedido?",
        a: "Los envíos estándar tardan 3–7 días hábiles. Envío express disponible en 24–48 horas. Recibirás un número de seguimiento por correo al confirmar tu compra.",
      },
      {
        q: "¿Puedo modificar o cancelar mi pedido?",
        a: "Puedes cancelar o modificar tu pedido dentro de las primeras 2 horas de haberlo realizado. Después de ese tiempo, el pedido entra en procesamiento. Contáctanos de inmediato si necesitas hacer cambios.",
      },
      {
        q: "¿Cómo puedo rastrear mi pedido?",
        a: "Una vez despachado tu pedido, recibirás un correo con el número de guía y el enlace para rastrearlo en tiempo real.",
      },
    ],
  },
  {
    category: "PAGOS",
    color:    "text-pink",
    items: [
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, Amex), transferencias bancarias y pagos digitales. Todos los pagos son procesados de forma segura mediante Shopify Payments.",
      },
      {
        q: "¿Mis datos de pago están seguros?",
        a: "Absolutamente. Utilizamos encriptación SSL y nunca almacenamos datos de tarjetas. El procesamiento se realiza a través de plataformas certificadas PCI-DSS.",
      },
    ],
  },
  {
    category: "DEVOLUCIONES",
    color:    "text-purple",
    items: [
      {
        q: "¿Cuál es la política de devoluciones?",
        a: "Tienes 30 días desde la recepción para solicitar una devolución. El producto debe estar en su empaque original y sin uso. Los artículos defectuosos tienen garantía extendida.",
      },
      {
        q: "¿Cómo inicio una devolución?",
        a: "Contáctanos por email o a través del formulario de contacto con tu número de pedido y el motivo de la devolución. Te enviaremos las instrucciones y la etiqueta de envío.",
      },
      {
        q: "¿Cuándo recibo mi reembolso?",
        a: "Una vez que recibamos y verifiquemos el producto, el reembolso se procesa en 5–10 días hábiles dependiendo de tu banco.",
      },
    ],
  },
  {
    category: "PRODUCTOS",
    color:    "text-yellow",
    items: [
      {
        q: "¿Los productos tienen garantía?",
        a: "Todos nuestros productos incluyen la garantía oficial del fabricante. Además, ofrecemos soporte técnico para asistirte con cualquier problema.",
      },
      {
        q: "¿Cómo sé si un producto es compatible con mi equipo?",
        a: "Cada ficha de producto incluye las especificaciones de compatibilidad. Si tienes dudas, contáctanos antes de comprar y nuestro equipo técnico te asesorará.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border-dim last:border-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
      >
        <span className="font-mono text-sm text-text-muted group-hover:text-text-primary transition-colors">
          {q}
        </span>
        <ChevronDown
          size={14}
          className={cn(
            "shrink-0 text-text-dim transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <p className="font-mono text-xs text-text-dim leading-relaxed pb-4 pl-0 pr-6">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <HelpCircle size={28} className="text-cyan mx-auto mb-4" />
          <p className="font-mono text-xs text-cyan tracking-widest mb-3">
            {"// PREGUNTAS_FRECUENTES.exe"}
          </p>
          <h1 className="font-display text-4xl font-black uppercase text-text-primary">
            FAQ
          </h1>
        </div>

        <div className="flex flex-col gap-8">
          {faqs.map(({ category, color, items }) => (
            <section key={category} className="cyber-card p-6">
              <h2 className={`font-display text-xs tracking-widest uppercase ${color} mb-4`}>
                {category}
              </h2>
              {items.map((item) => (
                <FaqItem key={item.q} {...item} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
