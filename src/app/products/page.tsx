import { Suspense } from "react";
import Link from "next/link";
import { getProducts, getCollections } from "@/lib/shopify";
import { ProductCard } from "@/components/shop/ProductCard";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Catálogo de Productos",
  description:
    "Explora nuestro catálogo completo de tecnología cyberpunk: componentes, periféricos y gadgets.",
};

interface SearchParams {
  query?:   string;
  sortKey?: string;
  reverse?: string;
  after?:   string;
}

const SORT_OPTIONS = [
  { label: "Relevancia",    value: "RELEVANCE",   reverse: "false" },
  { label: "Más vendidos",  value: "BEST_SELLING", reverse: "false" },
  { label: "Precio: menor", value: "PRICE",        reverse: "false" },
  { label: "Precio: mayor", value: "PRICE",        reverse: "true"  },
  { label: "Novedades",     value: "CREATED_AT",   reverse: "true"  },
  { label: "A-Z",           value: "TITLE",        reverse: "false" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params  = await searchParams;
  const query   = params.query;
  const sortKey = params.sortKey ?? "RELEVANCE";
  const reverse = params.reverse === "true";

  const [{ products, pageInfo }, collections] = await Promise.all([
    getProducts({ first: 24, query, sortKey, reverse }).catch(() => ({
      products: [],
      pageInfo: { hasNextPage: false },
    })),
    getCollections(12).catch(() => []),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="font-mono text-xs text-cyan tracking-widest mb-2">
          {"// CATÁLOGO"}
        </p>
        <h1 className="font-display text-4xl font-bold uppercase text-text-primary">
          {query ? `Resultados: "${query}"` : "Todos los Productos"}
        </h1>
        <p className="font-mono text-xs text-text-dim mt-2">
          {products.length} producto{products.length !== 1 ? "s" : ""} encontrado
          {products.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="sticky top-24 flex flex-col gap-6">
            <div>
              <h3 className="font-display text-[0.65rem] tracking-widest uppercase text-cyan mb-3">
                Colecciones
              </h3>
              <div className="flex flex-col gap-1">
                <Link
                  href="/products"
                  className="font-mono text-xs text-text-muted hover:text-cyan transition-colors py-1"
                >
                  Todos los productos
                </Link>
                {collections.map((col) => (
                  <Link
                    key={col.handle}
                    href={`/collections/${col.handle}`}
                    className="font-mono text-xs text-text-muted hover:text-cyan transition-colors py-1"
                  >
                    {col.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-[0.65rem] tracking-widest uppercase text-cyan mb-3">
                Ordenar por
              </h3>
              <div className="flex flex-col gap-1">
                {SORT_OPTIONS.map((opt) => {
                  const active =
                    sortKey === opt.value && String(reverse) === opt.reverse;
                  return (
                    <Link
                      key={`${opt.value}-${opt.reverse}`}
                      href={`/products?sortKey=${opt.value}&reverse=${opt.reverse}${query ? `&query=${query}` : ""}`}
                      className={`font-mono text-xs py-1 transition-colors ${
                        active
                          ? "text-cyan"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      {active && "▸ "}
                      {opt.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {query && (
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs text-text-muted">Filtros activos:</span>
              <Badge variant="cyan">
                {query}
                <Link
                  href="/products"
                  className="ml-2 hover:text-white"
                  aria-label="Limpiar búsqueda"
                >
                  ×
                </Link>
              </Badge>
            </div>
          )}

          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-bg-card border border-border-dim animate-pulse"
                  />
                ))}
              </div>
            }
          >
            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="border border-border-dim p-20 text-center">
                <p className="font-display text-sm tracking-widest uppercase text-text-muted mb-3">
                  SIN RESULTADOS
                </p>
                <p className="font-mono text-xs text-text-dim">
                  {"// Intenta con otros términos de búsqueda"}
                </p>
                <Link
                  href="/products"
                  className="inline-block mt-6 btn-cyber-primary"
                >
                  <span>VER TODOS</span>
                </Link>
              </div>
            )}
          </Suspense>

          {pageInfo && (pageInfo as { hasNextPage?: boolean }).hasNextPage && (
            <div className="flex justify-center mt-12">
              <Link
                href={`/products?sortKey=${sortKey}&reverse=${reverse}${query ? `&query=${query}` : ""}`}
                className="btn-cyber-primary"
              >
                <span>CARGAR MÁS</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
