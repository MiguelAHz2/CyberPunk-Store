import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | NEONTECH",
};

const sections = [
  {
    title: "1. Información que Recopilamos",
    body: "Recopilamos información que nos proporcionas directamente al crear una cuenta, realizar un pedido o contactarnos: nombre, email, dirección de envío y datos de pago (procesados de forma segura por Shopify Payments). También recopilamos datos de uso del sitio de forma anónima.",
  },
  {
    title: "2. Uso de la Información",
    body: "Usamos tu información para: procesar y enviar pedidos, gestionar tu cuenta, enviarte actualizaciones sobre tus pedidos, mejorar nuestros servicios y, con tu consentimiento, enviarte comunicaciones de marketing.",
  },
  {
    title: "3. Compartir Información",
    body: "No vendemos tu información personal a terceros. Compartimos datos únicamente con proveedores de servicios necesarios para operar (Shopify para pagos, servicios de envío para entrega). Todos los proveedores están obligados a proteger tu información.",
  },
  {
    title: "4. Seguridad de Datos",
    body: "Implementamos medidas de seguridad técnicas y organizativas para proteger tu información. Los datos de pago se procesan con encriptación SSL. Nunca almacenamos datos completos de tarjetas de crédito.",
  },
  {
    title: "5. Tus Derechos",
    body: "Tienes derecho a: acceder a tu información personal, corregir datos incorrectos, solicitar la eliminación de tu cuenta y datos, oponerte al procesamiento de tus datos para marketing. Para ejercer estos derechos, contáctanos.",
  },
  {
    title: "6. Cookies",
    body: "Usamos cookies esenciales para el funcionamiento del sitio (carrito de compras, sesión) y cookies analíticas para mejorar la experiencia. Puedes gestionar las cookies desde tu navegador. Ver nuestra Política de Cookies para más detalles.",
  },
  {
    title: "7. Retención de Datos",
    body: "Conservamos tu información mientras tu cuenta esté activa o sea necesaria para prestar servicios. Los datos de transacciones se conservan por el tiempo requerido por las obligaciones legales aplicables.",
  },
  {
    title: "8. Contacto",
    body: "Para preguntas sobre privacidad o para ejercer tus derechos, contáctanos en soporte@neontech.com o a través de nuestro formulario de contacto.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12">
          <p className="font-mono text-xs text-pink tracking-widest mb-3">
            {"// PRIVACIDAD.exe"}
          </p>
          <h1 className="font-display text-4xl font-black uppercase text-text-primary mb-2">
            Política de Privacidad
          </h1>
          <p className="font-mono text-xs text-text-dim">
            Última actualización: Marzo 2026
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {sections.map(({ title, body }) => (
            <section key={title} className="cyber-card p-6">
              <h2 className="font-display text-xs tracking-widest uppercase text-pink mb-3">
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
