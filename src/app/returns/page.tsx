import Link from "next/link";
import { RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devoluciones | NEONTECH",
  description: "Política de devoluciones y cambios de NEONTECH CyberPunk Store.",
};

export default function ReturnsPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <RotateCcw size={28} className="text-cyan mx-auto mb-4" />
          <p className="font-mono text-xs text-cyan tracking-widest mb-3">
            {"// DEVOLUCIONES.exe"}
          </p>
          <h1 className="font-display text-4xl font-black uppercase text-text-primary mb-4">
            Devoluciones y Cambios
          </h1>
          <p className="font-mono text-sm text-text-muted">
            {"// 30 días de garantía en todos nuestros productos"}
          </p>
        </div>

        {/* Plazo */}
        <div className="cyber-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={14} className="text-cyan" />
            <h2 className="font-display text-xs tracking-widest uppercase text-text-primary">
              Plazo de Devolución
            </h2>
          </div>
          <p className="font-mono text-sm text-text-muted leading-relaxed">
            Tienes <span className="text-cyan font-bold">30 días calendario</span> desde
            la fecha de recepción del producto para solicitar una devolución o cambio.
            Después de este período no se aceptarán devoluciones salvo defectos de fabricación.
          </p>
        </div>

        {/* Aplica / No aplica */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="cyber-card p-6 border-cyan">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={14} className="text-cyan" />
              <h2 className="font-display text-xs tracking-widest uppercase text-cyan">
                APLICA DEVOLUCIÓN
              </h2>
            </div>
            <ul className="space-y-2">
              {[
                "Producto defectuoso o dañado",
                "Producto diferente al pedido",
                "Producto incompleto",
                "Sin abrir (empaque original intacto)",
                "Dentro de los 30 días",
              ].map((item) => (
                <li key={item} className="font-mono text-xs text-text-muted flex items-start gap-2">
                  <span className="text-cyan mt-0.5">▸</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="cyber-card p-6 border-pink">
            <div className="flex items-center gap-2 mb-4">
              <XCircle size={14} className="text-pink" />
              <h2 className="font-display text-xs tracking-widest uppercase text-pink">
                NO APLICA
              </h2>
            </div>
            <ul className="space-y-2">
              {[
                "Producto usado o con desgaste",
                "Sin empaque original",
                "Daño por mal uso",
                "Pasados los 30 días",
                "Software o licencias digitales",
              ].map((item) => (
                <li key={item} className="font-mono text-xs text-text-muted flex items-start gap-2">
                  <span className="text-pink mt-0.5">▸</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Proceso */}
        <div className="cyber-card p-6 mb-6">
          <h2 className="font-display text-xs tracking-widest uppercase text-text-primary mb-4">
            Proceso de Devolución
          </h2>
          <div className="space-y-4">
            {[
              { num: "01", text: "Contáctanos por email o formulario de contacto con tu número de pedido y motivo." },
              { num: "02", text: "Te enviamos las instrucciones y etiqueta de envío en máximo 24 horas." },
              { num: "03", text: "Empaca el producto en su caja original y envíalo a nuestra dirección." },
              { num: "04", text: "Al recibir y verificar el producto, procesamos el reembolso en 5-10 días hábiles." },
            ].map(({ num, text }) => (
              <div key={num} className="flex gap-4">
                <span className="font-display text-xl font-black text-cyan shrink-0">{num}</span>
                <p className="font-mono text-xs text-text-muted leading-relaxed pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact" className="btn-cyber-primary">
            <span>INICIAR DEVOLUCIÓN</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
