import { MetadataRoute } from "next";
import { getProducts, getCollections } from "@/lib/shopify";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://neontech.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                  lastModified: new Date(), changeFrequency: "daily",   priority: 1 },
    { url: `${BASE_URL}/products`,    lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/collections`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/about`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const [{ products }, collections] = await Promise.all([
    getProducts({ first: 250 }).catch(() => ({ products: [] })),
    getCollections(50).catch(() => []),
  ]);

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url:             `${BASE_URL}/products/${p.handle}`,
    lastModified:    new Date(),
    changeFrequency: "daily"   as const,
    priority:        0.8,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url:             `${BASE_URL}/collections/${c.handle}`,
    lastModified:    new Date(),
    changeFrequency: "daily"  as const,
    priority:        0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
