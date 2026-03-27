import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCollectionProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const data = await getCollectionProducts(handle).catch(() => null);
  if (!data) return { title: "Colección no encontrada" };

  return {
    title:       data.collection.seo?.title ?? data.collection.title,
    description: data.collection.seo?.description ?? data.collection.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const data = await getCollectionProducts(handle, { first: 24 }).catch(() => null);

  if (!data) notFound();

  const { collection, products } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 font-mono text-xs text-text-dim mb-8">
        <Link href="/" className="hover:text-cyan transition-colors">Inicio</Link>
        <ChevronRight size={10} />
        <Link href="/collections" className="hover:text-cyan transition-colors">Colecciones</Link>
        <ChevronRight size={10} />
        <span className="text-text-muted">{collection.title}</span>
      </nav>

      {/* Collection header */}
      <div className="mb-10 relative overflow-hidden border border-border-dim p-8">
        {collection.image && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={collection.image.url}
              alt={collection.image.altText ?? collection.title}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-deep to-bg-deep/60" />
          </>
        )}
        <div className="relative z-10">
          <p className="font-mono text-xs text-cyan tracking-widest mb-2">
            // COLECCIÓN
          </p>
          <h1 className="font-display text-4xl font-bold uppercase text-text-primary mb-3">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="font-body text-text-muted max-w-xl">
              {collection.description}
            </p>
          )}
          <p className="font-mono text-xs text-text-dim mt-3">
            {products.length} producto{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="border border-border-dim p-20 text-center">
          <p className="font-mono text-xs text-text-dim">
            // Esta colección no tiene productos todavía
          </p>
        </div>
      )}
    </div>
  );
}
