import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Uso | NEONTECH",
};

const sections = [
  {
    title: "1. Aceptación de Términos",
    body: "Al acceder y utilizar este sitio web, aceptas cumplir y quedar vinculado por estos Términos de Uso. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.",
  },
  {
    title: "2. Uso del Sitio",
    body: "Este sitio está destinado únicamente para uso personal y no comercial. No puedes usar este sitio para ningún propósito ilegal o no autorizado. Debes respetar todas las leyes aplicables en tu jurisdicción.",
  },
  {
    title: "3. Productos y Precios",
    body: "Nos reservamos el derecho de modificar los precios de nuestros productos en cualquier momento sin previo aviso. Los precios mostrados incluyen impuestos aplicables. Nos reservamos el derecho de rechazar o cancelar pedidos en caso de errores de precio.",
  },
  {
    title: "4. Proceso de Compra",
    body: "Al realizar un pedido, confirmas que la información proporcionada es correcta y que estás autorizado a usar el método de pago seleccionado. La confirmación del pedido no garantiza la disponibilidad del producto.",
  },
  {
    title: "5. Propiedad Intelectual",
    body: "Todo el contenido de este sitio, incluyendo textos, imágenes, logotipos y diseños, está protegido por derechos de autor. No puedes reproducir, distribuir o crear trabajos derivados sin nuestro consentimiento expreso.",
  },
  {
    title: "6. Limitación de Responsabilidad",
    body: "No seremos responsables de daños indirectos, incidentales o consecuentes derivados del uso de nuestros productos o servicios. Nuestra responsabilidad máxima se limita al valor del pedido en cuestión.",
  },
  {
    title: "7. Modificaciones",
    body: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entran en vigor al ser publicadas en el sitio. Es tu responsabilidad revisar periódicamente estos términos.",
  },
  {
    title: "8. Ley Aplicable",
    body: "Estos términos se rigen por las leyes aplicables en Colombia. Cualquier disputa será resuelta en los tribunales competentes de dicha jurisdicción.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12">
          <p className="font-mono text-xs text-cyan tracking-widest mb-3">
            {"// LEGAL.exe"}
          </p>
          <h1 className="font-display text-4xl font-black uppercase text-text-primary mb-2">
            Términos de Uso
          </h1>
          <p className="font-mono text-xs text-text-dim">
            Última actualización: Marzo 2026
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {sections.map(({ title, body }) => (
            <section key={title} className="cyber-card p-6">
              <h2 className="font-display text-xs tracking-widest uppercase text-cyan mb-3">
                {title}
              </h2>
              <p className="font-mono text-sm text-text-muted leading-relaxed">
                {body}
              </p>
            </section>
          ))}
        </div>

        <p className="font-mono text-xs text-text-dim mt-8 text-center">
          {"// ¿Preguntas? "}
          <a href="/contact" className="text-cyan hover:underline">Contáctanos</a>
        </p>
      </div>
    </main>
  );
}
