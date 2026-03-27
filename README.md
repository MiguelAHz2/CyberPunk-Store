# NEONTECH — Tienda CyberPunk

Tienda virtual de tecnología con estética cyberpunk construida con Next.js 15, Shopify Storefront API y Supabase.

## Stack

- **Frontend:** Next.js 15 (App Router)
- **Estilos:** Tailwind CSS v4 + Framer Motion
- **Ecommerce:** Shopify Storefront GraphQL API
- **Auth / DB:** Supabase
- **Estado:** Zustand
- **Deploy:** Vercel

## Configuración inicial

### 1. Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

```env
SHOPIFY_STORE_DOMAIN=tu-tienda.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=tu_token
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
REVALIDATION_SECRET=tu_secret_aleatorio
```

### 2. Shopify — Obtener credenciales

1. Crea una tienda en [shopify.com](https://shopify.com) (Development Store gratis para desarrollo)
2. Ve a: Admin → Apps → Develop apps → Create an app
3. En la app: API credentials → Configure Storefront API scopes
4. Activa: `unauthenticated_read_product_listings`, `unauthenticated_read_checkouts`, `unauthenticated_write_checkouts`
5. Instala la app y copia el **Storefront API access token**

### 3. Supabase — Crear proyecto

1. Crea proyecto en [supabase.com](https://supabase.com)
2. Ve a Settings → API y copia URL y anon key
3. Ejecuta en el SQL Editor de Supabase:

```sql
-- Tabla de wishlist
CREATE TABLE wishlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_handle TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own wishlist"
  ON wishlists FOR ALL USING (auth.uid() = user_id);
```

### 4. MercadoPago en Shopify

No requiere integración de código. Actívalo en:
**Shopify Admin → Settings → Payments → MercadoPago**

## Desarrollo local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Deploy en Vercel

```bash
# Instala Vercel CLI
npm i -g vercel

# Deploy
vercel

# Producción
vercel --prod
```

Agrega las variables de entorno en el dashboard de Vercel:
`Settings → Environment Variables`

## Estructura del proyecto

```
src/
├── app/                  # Páginas (App Router)
│   ├── page.tsx          # Home
│   ├── products/         # Catálogo y detalle
│   ├── collections/      # Colecciones
│   ├── login/            # Auth
│   ├── register/
│   ├── account/          # Perfil, pedidos, wishlist
│   └── api/revalidate/   # Webhook Shopify
├── components/
│   ├── cyberpunk/        # Efectos visuales
│   ├── shop/             # Componentes de tienda
│   ├── layout/           # Header, Footer
│   └── ui/               # Botones, inputs, badges
├── lib/
│   ├── shopify/          # Cliente GraphQL + queries
│   └── supabase/         # Cliente browser + server
├── store/                # Zustand (carrito)
└── hooks/                # useAddToCart
```

## Webhook de revalidación

Configura en Shopify para revalidar automáticamente el caché:
- **URL:** `https://tu-dominio.com/api/revalidate?secret=TU_SECRET`
- **Eventos:** `products/create`, `products/update`, `collections/update`
