import { Truck, Package, Clock, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Envíos y Entregas | CYBERSTORE",
  description: "Información sobre envíos, tiempos de entrega y zonas de cobertura.",
};

const plans = [
  {
    icon:  Clock,
    color: "border-cyan text-cyan",
    name:  "ESTÁNDAR",
    time:  "3–7 días hábiles",
    price: "Calculado al checkout",
    desc:  "Cobertura nacional completa. Rastreo en tiempo real incluido.",
  },
  {
    icon:  Truck,
    color: "border-pink text-pink",
    name:  "EXPRESS",
    time:  "24–48 horas",
    price: "Tarifa premium",
    desc:  "Para cuando lo necesitas ya. Disponible en ciudades principales.",
  },
  {
    icon:  Package,
    color: "border-purple text-purple",
    name:  "GRATIS",
    time:  "5–7 días hábiles",
    price: "En pedidos +$150.000",
    desc:  "Sin costo adicional en pedidos que superen el monto mínimo.",
  },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <Truck size={28} className="text-cyan mx-auto mb-4" />
          <p className="font-mono text-xs text-cyan tracking-widest mb-3">
            {"// ENVIOS.exe"}
          </p>
          <h1 className="font-display text-4xl font-black uppercase text-text-primary mb-4">
            Envíos y Entregas
          </h1>
          <p className="font-mono text-sm text-text-muted">
            {"// Llevamos tu hardware a cualquier nodo de la red"}
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map(({ icon: Icon, color, name, time, price, desc }) => (
            <div key={name} className={`cyber-card p-6 border ${color.split(" ")[0]}`}>
              <Icon size={24} className={color.split(" ")[1] + " mb-4"} />
              <h2 className={`font-display text-xs tracking-widest uppercase ${color.split(" ")[1]} mb-2`}>
                {name}
              </h2>
              <p className="font-mono text-sm text-text-primary font-medium mb-1">{time}</p>
              <p className="font-mono text-xs text-text-dim mb-3">{price}</p>
              <p className="font-mono text-xs text-text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <section className="cyber-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Package size={14} className="text-pink" />
            <h2 className="font-display text-xs tracking-widest uppercase text-text-primary">
              PROCESO DE ENVÍO
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: "01", label: "Confirmación",    desc: "Recibes email con resumen de tu pedido" },
              { step: "02", label: "Procesamiento",   desc: "Preparamos y empacamos tu hardware" },
              { step: "03", label: "Despacho",        desc: "Enviamos con guía de rastreo" },
              { step: "04", label: "Entrega",         desc: "Tu pedido llega a destino" },
            ].map(({ step, label, desc }) => (
              <div key={step} className="text-center p-4 border border-border-dim">
                <p className="font-display text-2xl font-black text-cyan mb-2">{step}</p>
                <p className="font-display text-[0.6rem] tracking-widest uppercase text-text-primary mb-1">
                  {label}
                </p>
                <p className="font-mono text-[0.6rem] text-text-dim leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Coverage */}
        <section className="cyber-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={14} className="text-purple" />
            <h2 className="font-display text-xs tracking-widest uppercase text-text-primary">
              COBERTURA
            </h2>
          </div>
          <div className="font-mono text-sm text-text-muted space-y-2">
            <p>{"// Enviamos a todo el territorio nacional."}</p>
            <p>{"// Para envíos internacionales, contáctanos directamente."}</p>
            <p>{"// Los tiempos pueden variar según la región de destino."}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
