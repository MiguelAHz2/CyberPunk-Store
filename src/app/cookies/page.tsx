import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | NEONTECH",
};

const cookieTypes = [
  {
    color: "text-cyan",
    name:  "ESENCIALES",
    desc:  "Necesarias para el funcionamiento básico del sitio. No pueden desactivarse.",
    examples: ["Sesión de usuario", "Carrito de compras", "Preferencias de seguridad"],
    canDisable: false,
  },
  {
    color: "text-pink",
    name:  "ANALÍTICAS",
    desc:  "Nos ayudan a entender cómo los visitantes interactúan con el sitio.",
    examples: ["Páginas visitadas", "Tiempo en el sitio", "Errores encontrados"],
    canDisable: true,
  },
  {
    color: "text-purple",
    name:  "DE MARKETING",
    desc:  "Usadas para mostrarte publicidad relevante en otros sitios.",
    examples: ["Anuncios personalizados", "Retargeting", "Redes sociales"],
    canDisable: true,
  },
];

export default function CookiesPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12">
          <p className="font-mono text-xs text-purple tracking-widest mb-3">
            {"// COOKIES.exe"}
          </p>
          <h1 className="font-display text-4xl font-black uppercase text-text-primary mb-2">
            Política de Cookies
          </h1>
          <p className="font-mono text-xs text-text-dim mb-6">
            Última actualización: Marzo 2026
          </p>
          <p className="font-mono text-sm text-text-muted leading-relaxed">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo
            cuando visitas nuestro sitio. Las usamos para mejorar tu experiencia de compra
            y el funcionamiento del sitio.
          </p>
        </div>

        <div className="flex flex-col gap-6 mb-8">
          {cookieTypes.map(({ color, name, desc, examples, canDisable }) => (
            <div key={name} className="cyber-card p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className={`font-display text-xs tracking-widest uppercase ${color}`}>
                  {name}
                </h2>
                <span className={`font-mono text-[0.6rem] tracking-widest px-2 py-0.5 border ${
                  canDisable
                    ? "border-border-dim text-text-dim"
                    : "border-cyan text-cyan"
                }`}>
                  {canDisable ? "OPCIONAL" : "REQUERIDA"}
                </span>
              </div>
              <p className="font-mono text-sm text-text-muted leading-relaxed mb-3">
                {desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {examples.map((ex) => (
                  <span key={ex} className="font-mono text-[0.6rem] text-text-dim border border-border-dim px-2 py-0.5">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="cyber-card p-6">
          <h2 className="font-display text-xs tracking-widest uppercase text-text-primary mb-3">
            Gestionar Cookies
          </h2>
          <p className="font-mono text-sm text-text-muted leading-relaxed mb-4">
            Puedes controlar y eliminar cookies desde la configuración de tu navegador.
            Ten en cuenta que desactivar algunas cookies puede afectar la funcionalidad
            del sitio (como el carrito de compras).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Chrome", "Firefox", "Safari", "Edge"].map((browser) => (
              <div key={browser} className="border border-border-dim p-3 text-center">
                <p className="font-mono text-xs text-text-muted">{browser}</p>
                <p className="font-mono text-[0.6rem] text-text-dim mt-1">
                  Configuración → Privacidad
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="font-mono text-xs text-text-dim mt-8 text-center">
          {"// ¿Preguntas? "}
          <a href="/contact" className="text-cyan hover:underline">Contáctanos</a>
        </p>
      </div>
    </main>
  );
}
