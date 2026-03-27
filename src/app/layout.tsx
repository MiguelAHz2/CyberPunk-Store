import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { ScanlineOverlay } from "@/components/cyberpunk/ScanlineOverlay";
import { SetupBanner } from "@/components/dev/SetupBanner";

const orbitron = Orbitron({
  variable:  "--font-orbitron",
  subsets:   ["latin"],
  weight:    ["400", "500", "600", "700", "800", "900"],
  display:   "swap",
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets:  ["latin"],
  weight:   "400",
  display:  "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700"],
  display:  "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default:  "NEONTECH | Tienda CyberPunk de Tecnología",
    template: "%s | NEONTECH",
  },
  description:
    "Componentes PC, periféricos y gadgets de alta tecnología. Estética cyberpunk, rendimiento real. Envíos a toda Latinoamérica.",
  keywords: ["tecnología", "cyberpunk", "componentes pc", "periféricos", "gaming", "RGB"],
  openGraph: {
    type:        "website",
    locale:      "es_CO",
    url:         process.env.NEXT_PUBLIC_SITE_URL,
    siteName:    "NEONTECH",
    title:       "NEONTECH | Tienda CyberPunk de Tecnología",
    description: "Tecnología del futuro, disponible hoy.",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "NEONTECH | Tienda CyberPunk",
    description: "Tecnología de punta con estética cyberpunk.",
  },
  robots: {
    index:   true,
    follow:  true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${orbitron.variable} ${shareTechMono.variable} ${rajdhani.variable} h-full`}
    >
      <body className="bg-bg-deep text-text-primary font-body antialiased flex flex-col min-h-screen">
        <ScanlineOverlay />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        {process.env.NODE_ENV === "development" && (
          <SetupBanner
            checks={[
              {
                label: "Shopify Domain",
                ok: Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STORE_DOMAIN !== "tu-tienda.myshopify.com"),
                hint: "Agrega SHOPIFY_STORE_DOMAIN en .env.local",
              },
              {
                label: "Shopify Token",
                ok: Boolean(process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN !== "tu_storefront_access_token"),
                hint: "Agrega SHOPIFY_STOREFRONT_ACCESS_TOKEN en .env.local",
              },
              {
                label: "Supabase URL",
                ok: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://tu-proyecto.supabase.co"),
                hint: "Agrega NEXT_PUBLIC_SUPABASE_URL en .env.local",
              },
              {
                label: "Supabase Key",
                ok: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "tu_anon_key"),
                hint: "Agrega NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local",
              },
            ]}
          />
        )}
      </body>
    </html>
  );
}
