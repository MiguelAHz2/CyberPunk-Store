import Link from "next/link";
import { getCollections } from "@/lib/shopify";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Colecciones",
  description: "Explora nuestras colecciones de tecnología cyberpunk.",
};

export default async function CollectionsPage() {
  const collections = await getCollections(20).catch(() => []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="font-mono text-xs text-cyan tracking-widest mb-2">
          // COLECCIONES
        </p>
        <h1 className="font-display text-4xl font-bold uppercase text-text-primary">
          Todas las Colecciones
        </h1>
      </div>

      {collections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link
              key={col.handle}
              href={`/collections/${col.handle}`}
              className="group cyber-card overflow-hidden relative aspect-video flex items-end p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-bg-deep/40 to-transparent z-10" />
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
              <div className="relative z-20">
                <h2 className="font-display text-sm tracking-widest uppercase text-text-primary group-hover:text-cyan transition-colors mb-1">
                  {col.title}
                </h2>
                {col.description && (
                  <p className="font-mono text-xs text-text-dim line-clamp-2">
                    {col.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-border-dim p-20 text-center">
          <p className="font-mono text-xs text-text-dim">
            // Conecta tu tienda Shopify para ver las colecciones
          </p>
        </div>
      )}
    </div>
  );
}
