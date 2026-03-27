import Link from "next/link";
import { ArrowRight, Cpu, Zap, Shield, Truck } from "lucide-react";
import { getFeaturedProducts, getCollections } from "@/lib/shopify";
import { ProductCard } from "@/components/shop/ProductCard";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { HexGrid } from "@/components/cyberpunk/HexGrid";
import { Badge } from "@/components/ui/Badge";

export const revalidate = 60;

const FEATURES = [
  { icon: Zap,    label: "Envío Express",     desc: "Entrega en 24-48h" },
  { icon: Shield, label: "Garantía Real",      desc: "12 meses en todos los productos" },
  { icon: Cpu,    label: "Tech Auténtica",     desc: "Productos 100% originales" },
  { icon: Truck,  label: "Envíos LATAM",       desc: "Toda Latinoamérica" },
];

export default async function HomePage() {
  const [featured, collections] = await Promise.all([
    getFeaturedProducts(8).catch(() => []),
    getCollections(6).catch(() => []),
  ]);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-grid">
        <HexGrid opacity={0.05} />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/80 via-transparent to-bg-deep" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,245,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Vertical accent lines */}
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan/20 to-transparent" />
        <div className="absolute right-[10%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-pink/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 py-24 w-full">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="cyan">NUEVA TEMPORADA</Badge>
              <div
                className="h-px flex-1 max-w-[120px]"
                style={{
                  background:
                    "linear-gradient(90deg, var(--cyan), transparent)",
                }}
              />
              <span className="font-mono text-[0.6rem] text-text-dim tracking-widest">
                2026.Q1
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black leading-none mb-6">
              <span className="block text-5xl sm:text-7xl lg:text-8xl text-text-primary mb-2">
                EL FUTURO
              </span>
              <span className="block text-5xl sm:text-7xl lg:text-8xl">
                <GlitchText text="YA LLEGÓ" color="cyan" />
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl text-pink mt-3 font-mono font-normal tracking-widest">
                // NEONTECH STORE
              </span>
            </h1>

            <p className="font-body text-lg text-text-muted max-w-xl mb-10 leading-relaxed">
              Componentes de última generación, periféricos de alto rendimiento
              y gadgets que redefinen la experiencia tecnológica. Estética
              cyberpunk, calidad premium.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-cyber-primary">
                <span className="flex items-center gap-2">
                  EXPLORAR CATÁLOGO
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/collections" className="btn-cyber-secondary">
                <span>VER COLECCIONES</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-16 pt-8 border-t border-border-dim">
              {[
                { value: "500+",  label: "Productos" },
                { value: "10K+",  label: "Clientes" },
                { value: "99.8%", label: "Satisfacción" },
                { value: "24/7",  label: "Soporte" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-2xl font-bold text-cyan">
                    {value}
                  </p>
                  <p className="font-mono text-[0.65rem] text-text-dim tracking-widest uppercase mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-deep to-transparent" />
      </section>

      {/* ── Features strip ─────────────────────────────────── */}
      <section className="border-y border-border-dim bg-bg-dark">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-border-dim">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3 px-6 py-4">
              <div className="flex-shrink-0 w-8 h-8 border border-border-cyan flex items-center justify-center">
                <Icon size={14} className="text-cyan" />
              </div>
              <div>
                <p className="font-display text-[0.65rem] tracking-widest uppercase text-text-primary">
                  {label}
                </p>
                <p className="font-mono text-[0.6rem] text-text-dim">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Collections ────────────────────────────────────── */}
      {collections.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-xs text-cyan tracking-widest mb-2">
                // CATEGORIAS
              </p>
              <h2 className="font-display text-3xl font-bold uppercase text-text-primary">
                Colecciones
              </h2>
            </div>
            <Link
              href="/collections"
              className="font-mono text-xs text-text-muted hover:text-cyan transition-colors tracking-widest flex items-center gap-1"
            >
              VER TODAS <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {collections.map((col) => (
              <Link
                key={col.handle}
                href={`/collections/${col.handle}`}
                className="group cyber-card overflow-hidden aspect-square relative flex items-end p-4"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 to-transparent z-10" />
                {col.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={col.image.url}
                    alt={col.image.altText ?? col.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-grid-dense" />
                )}
                <p className="relative z-20 font-display text-[0.65rem] tracking-widest uppercase text-text-primary group-hover:text-cyan transition-colors">
                  {col.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Featured Products ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs text-pink tracking-widest mb-2">
              // MÁS VENDIDOS
            </p>
            <h2 className="font-display text-3xl font-bold uppercase text-text-primary">
              Productos Destacados
            </h2>
          </div>
          <Link
            href="/products"
            className="font-mono text-xs text-text-muted hover:text-cyan transition-colors tracking-widest flex items-center gap-1"
          >
            VER TODOS <ArrowRight size={12} />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty state while Shopify is being configured */
          <div className="border border-border-dim p-16 text-center bg-bg-dark">
            <div className="font-mono text-xs text-text-dim tracking-widest mb-4">
              // CONECTA TU TIENDA SHOPIFY PARA VER PRODUCTOS
            </div>
            <p className="font-mono text-[0.65rem] text-text-dim">
              Configura las variables de entorno en{" "}
              <code className="text-cyan">.env.local</code>
            </p>
          </div>
        )}
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-border-dim bg-bg-dark">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 80% 50%, rgba(255,0,110,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-mono text-xs text-pink tracking-widest mb-3">
              // OFERTA LIMITADA
            </p>
            <h2 className="font-display text-4xl font-black uppercase leading-tight">
              HASTA{" "}
              <span className="text-pink text-neon-pink">40% OFF</span>
              <br />
              EN PERIFÉRICOS
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/products?sortKey=PRICE&reverse=false"
              className="btn-cyber-secondary"
            >
              <span className="flex items-center gap-2">
                VER OFERTAS
                <ArrowRight size={14} />
              </span>
            </Link>
            <p className="font-mono text-[0.6rem] text-text-dim text-center">
              Válido mientras dure el stock
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
