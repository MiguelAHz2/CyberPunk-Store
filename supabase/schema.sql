-- ============================================================
-- NEONTECH CyberPunk Store — Schema Supabase
-- Ejecuta este archivo en: Supabase Dashboard > SQL Editor
-- ============================================================

-- ── Tabla de perfiles de usuario ─────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios ven su propio perfil"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuarios actualizan su propio perfil"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-crear perfil al registrarse
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── Tabla de wishlist ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlists (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id      TEXT NOT NULL,
  product_handle  TEXT NOT NULL,
  product_title   TEXT NOT NULL,
  product_image   TEXT,
  product_price   TEXT,
  currency_code   TEXT DEFAULT 'USD',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios gestionan su propia wishlist"
  ON wishlists FOR ALL
  USING (auth.uid() = user_id);

-- ── Tabla de reseñas de productos ────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id      TEXT NOT NULL,
  product_handle  TEXT NOT NULL,
  rating          SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title           TEXT,
  body            TEXT,
  verified        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reseñas son públicas para lectura"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Usuarios crean sus propias reseñas"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios editan sus propias reseñas"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuarios eliminan sus propias reseñas"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- ── Índices para performance ──────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_wishlists_user_id      ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_product_id   ON wishlists(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id     ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_handle ON reviews(product_handle);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id        ON reviews(user_id);

-- ── Vista de ratings promedio por producto ────────────────────
CREATE OR REPLACE VIEW product_ratings AS
  SELECT
    product_id,
    product_handle,
    COUNT(*)::INT            AS review_count,
    ROUND(AVG(rating), 1)   AS avg_rating
  FROM reviews
  GROUP BY product_id, product_handle;
