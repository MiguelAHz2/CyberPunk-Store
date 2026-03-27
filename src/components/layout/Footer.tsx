import Link from "next/link";
import { Zap, Globe, Code2, Share2 } from "lucide-react";

const LINKS = {
  Tienda: [
    { label: "Todos los productos", href: "/products" },
    { label: "Colecciones",         href: "/collections" },
    { label: "Ofertas",             href: "/products?sortKey=PRICE" },
    { label: "Novedades",           href: "/products?sortKey=CREATED_AT&reverse=true" },
  ],
  Soporte: [
    { label: "FAQ",              href: "/faq" },
    { label: "Envíos",          href: "/shipping" },
    { label: "Devoluciones",    href: "/returns" },
    { label: "Contacto",        href: "/contact" },
  ],
  Legal: [
    { label: "Términos de uso",      href: "/terms" },
    { label: "Política de privacidad", href: "/privacy" },
    { label: "Cookies",              href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border-dim bg-bg-dark mt-20">
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--cyan), var(--pink), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 flex items-center justify-center border border-cyan group-hover:shadow-[0_0_12px_var(--cyan)] transition-shadow">
                <Zap
                  size={16}
                  className="text-cyan"
                  fill="currentColor"
                />
              </div>
              <span className="font-display text-sm font-bold tracking-widest uppercase">
                NEON<span className="text-pink">TECH</span>
              </span>
            </Link>
            <p className="font-mono text-xs text-text-muted leading-relaxed max-w-xs mb-6">
              // Tecnología de punta para la era digital. <br />
              Componentes, periféricos y gadgets con estética del futuro.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
              { icon: Code2,  href: "#", label: "GitHub" },
              { icon: Globe,  href: "#", label: "Web" },
              { icon: Share2, href: "#", label: "Redes" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-border-dim text-text-muted hover:border-cyan hover:text-cyan hover:shadow-[0_0_8px_var(--cyan-glow)] transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-[0.65rem] tracking-[0.2em] uppercase text-cyan mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-mono text-xs text-text-muted hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border-dim flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[0.65rem] text-text-dim tracking-widest">
            © {new Date().getFullYear()} NEONTECH // TODOS LOS DERECHOS RESERVADOS
          </p>
          <div className="flex items-center gap-3">
            {["VISA", "MASTERCARD", "MERCADOPAGO", "SHOPIFY"].map((brand) => (
              <span
                key={brand}
                className="font-mono text-[0.55rem] tracking-widest border border-border-dim text-text-dim px-2 py-0.5"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
