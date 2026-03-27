import { Zap, Shield, Globe, Cpu } from "lucide-react";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros | CYBERSTORE",
  description: "Somos la tienda de tecnología más punk del futuro.",
};

const values = [
  {
    icon:  Zap,
    color: "text-cyan",
    title: "VELOCIDAD",
    desc:  "Envíos rápidos, atención inmediata. El tiempo es lo único que no se puede hackear.",
  },
  {
    icon:  Shield,
    color: "text-pink",
    title: "SEGURIDAD",
    desc:  "Pagos encriptados, datos protegidos. Tu privacidad es nuestro protocolo primario.",
  },
  {
    icon:  Globe,
    color: "text-purple",
    title: "COBERTURA",
    desc:  "Enviamos a toda la red. Desde la ciudad hasta los sectores más remotos del grid.",
  },
  {
    icon:  Cpu,
    color: "text-yellow",
    title: "CALIDAD",
    desc:  "Solo hardware de última generación. Cero tolerancia al hardware defectuoso.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 border-b border-border-dim overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,245,255,0.06)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <p className="font-mono text-xs text-cyan tracking-widest mb-4">
            {"// ABOUT_US.exe"}
          </p>
          <GlitchText
            text="SOBRE NOSOTROS"
            as="h1"
            className="font-display text-4xl md:text-6xl font-black uppercase mb-6"
          />
          <p className="font-mono text-sm text-text-muted max-w-2xl mx-auto leading-relaxed">
            Somos más que una tienda. Somos la interfaz entre el hardware de élite
            y los corredores digitales que lo necesitan. Fundados en el corazón del
            grid, operamos donde la tecnología se convierte en arte.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs text-pink tracking-widest mb-3">
              {"// ORIGEN"}
            </p>
            <h2 className="font-display text-2xl font-bold uppercase text-text-primary mb-4">
              Nuestra Historia
            </h2>
            <div className="font-mono text-sm text-text-muted space-y-3 leading-relaxed">
              <p>
                Empezamos en un bunker digital, vendiendo piezas de computadora
                a corredores de datos que no podían pagar los precios corporativos.
              </p>
              <p>
                Hoy operamos como una de las tiendas de tecnología más respetadas
                del underground digital, con miles de clientes satisfechos en toda
                la red.
              </p>
              <p>
                Nuestro código: sin intermediarios, sin markup corporativo, sin
                censura. Solo el mejor hardware al precio justo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "2K+", label: "CLIENTES" },
              { num: "500+", label: "PRODUCTOS" },
              { num: "99%", label: "SATISFACCIÓN" },
              { num: "24/7", label: "SOPORTE" },
            ].map(({ num, label }) => (
              <div key={label} className="cyber-card p-6 text-center">
                <p className="font-display text-3xl font-black text-cyan text-neon-cyan mb-1">
                  {num}
                </p>
                <p className="font-mono text-[0.65rem] text-text-dim tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 border-t border-border-dim bg-bg-card">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-purple tracking-widest mb-3">
              {"// CORE_VALUES"}
            </p>
            <h2 className="font-display text-2xl font-bold uppercase text-text-primary">
              Nuestros Valores
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="cyber-card p-6 text-center">
                <Icon size={28} className={`${color} mx-auto mb-4`} />
                <h3 className={`font-display text-xs tracking-widest uppercase ${color} mb-3`}>
                  {title}
                </h3>
                <p className="font-mono text-xs text-text-muted leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
