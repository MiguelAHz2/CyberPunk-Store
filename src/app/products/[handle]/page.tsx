import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Truck } from "lucide-react";
import { getProductByHandle, getFeaturedProducts } from "@/lib/shopify";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductCard } from "@/components/shop/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { ProductDetailClient } from "./ProductDetailClient";
import { isInWishlist } from "@/app/actions/wishlist";
import { ReviewSection } from "@/components/shop/ReviewSection";
import type { Metadata } from "next";

// force-dynamic: esta página tiene datos de usuario (wishlist, reseñas)
// Los datos de Shopify se cachean a nivel de fetch con revalidateTag
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle).catch(() => null);
  if (!product) return { title: "Producto no encontrado" };

  return {
    title:       product.seo.title ?? product.title,
    description: product.seo.description ?? product.description,
    openGraph: {
      title:       product.title,
      description: product.description,
      images:      product.featuredImage ? [product.featuredImage.url] : [],
    },
  };
}

export async function generateStaticParams() {
  const featured = await getFeaturedProducts(20).catch(() => []);
  return featured.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const [product, related] = await Promise.all([
    getProductByHandle(handle).catch(() => null),
    getFeaturedProducts(5).catch(() => []),
  ]);

  const inWishlist = product
    ? await isInWishlist(product.id).catch(() => false)
    : false;

  if (!product) notFound();

  const images         = product.images.edges.map((e) => e.node);
  const variants       = product.variants.edges.map((e) => e.node);
  const defaultOptions: Record<string, string> = {};
  product.options.forEach((opt) => {
    defaultOptions[opt.name] = opt.values[0];
  });

  const price     = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const discountPct = hasDiscount
    ? Math.round(
        ((parseFloat(compareAt!.amount) - parseFloat(price.amount)) /
          parseFloat(compareAt!.amount)) *
          100
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 font-mono text-xs text-text-dim mb-8">
        <Link href="/" className="hover:text-cyan transition-colors">
          Inicio
        </Link>
        <ChevronRight size={10} />
        <Link href="/products" className="hover:text-cyan transition-colors">
          Productos
        </Link>
        <ChevronRight size={10} />
        <span className="text-text-muted truncate max-w-[200px]">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Gallery */}
        <ProductGallery images={images} title={product.title} />

        {/* Info */}
        <div className="flex flex-col gap-6">
          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="dim">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase text-text-primary tracking-widest leading-tight">
            {product.title}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-3xl text-cyan text-neon-cyan">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {hasDiscount && (
              <>
                <span className="font-mono text-lg text-text-dim line-through">
                  {formatPrice(compareAt!.amount, compareAt!.currencyCode)}
                </span>
                <Badge variant="pink">-{discountPct}%</Badge>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                product.availableForSale
                  ? "bg-cyan shadow-[0_0_6px_var(--cyan)]"
                  : "bg-red-500"
              }`}
            />
            <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
              {product.availableForSale ? "EN STOCK" : "AGOTADO"}
            </span>
          </div>

          <div
            className="h-px"
            style={{
              background:
                "linear-gradient(90deg, var(--cyan), var(--pink), transparent)",
            }}
          />

          {/* Interactive client part */}
          <ProductDetailClient
            variants={variants}
            options={product.options}
            defaultOptions={defaultOptions}
            availableForSale={product.availableForSale}
            productId={product.id}
            handle={product.handle}
            title={product.title}
            image={product.featuredImage?.url ?? null}
            price={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
            initialWishlist={inWishlist}
          />

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="font-display text-[0.65rem] tracking-widest uppercase text-cyan mb-3">
                Descripción
              </h3>
              <div
                className="font-body text-sm text-text-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>
          )}

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border-dim">
            {[
              { icon: ShieldCheck, label: "Garantía 12 meses" },
              { icon: Truck,       label: "Envío a LATAM" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 border border-border-dim p-3"
              >
                <Icon size={14} className="text-cyan" />
                <span className="font-mono text-[0.6rem] text-text-muted tracking-widest uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ReviewSection productId={product.id} productHandle={handle} />

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border-dim pt-12">
          <div className="mb-8">
            <p className="font-mono text-xs text-cyan tracking-widest mb-2">
              {"// TAMBIÉN TE PUEDE INTERESAR"}
            </p>
            <h2 className="font-display text-2xl font-bold uppercase text-text-primary">
              Productos Relacionados
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related
              .filter((p) => p.handle !== handle)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
