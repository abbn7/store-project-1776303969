-- Store Database Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories indexes
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories(display_order);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active) WHERE is_active = true;

-- Categories RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Service role can modify categories" ON categories
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 2. PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  compare_at_price NUMERIC(10,2) CHECK (compare_at_price >= 0),
  discount_percentage INT DEFAULT 0 CHECK (discount_percentage BETWEEN 0 AND 100),
  images TEXT[] NOT NULL DEFAULT '{}',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  stock INT DEFAULT 0 CHECK (stock >= 0),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at DESC);

-- Products RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Service role can modify products" ON products
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 3. SITE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Service role can modify settings" ON site_settings
  FOR ALL USING (auth.role() = 'service_role');

-- Default settings
INSERT INTO site_settings (key, value) VALUES
('store_name', '"My Store"'),
('logo', '""'),
('hero', '{
  "title": "Welcome to Our Store",
  "subtitle": "Discover amazing products at great prices",
  "cta_primary": "Shop Now",
  "cta_secondary": "Learn More",
  "background_image": ""
}'),
('announcement_bar', '{
  "text": "Free shipping on orders over $50",
  "color": "#E94560",
  "is_active": true
}'),
('social_links', '{
  "instagram": "",
  "facebook": "",
  "tiktok": "",
  "whatsapp": "",
  "twitter": ""
}'),
('contact', '{
  "email": "contact@store.com",
  "phone": "",
  "address": ""
}'),
('footer_text', '"© 2026 My Store. All rights reserved."'),
('colors', '{
  "primary": "#1A1A2E",
  "accent": "#E94560",
  "gold": "#C9A84C"
}')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- 4. REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  reviewer_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews indexes
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved) WHERE is_approved = true;
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at DESC);

-- Reviews RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view approved reviews" ON reviews
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Anyone can create reviews" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can modify reviews" ON reviews
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 5. NEWSLETTER SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_date ON newsletter_subscribers(subscribed_at DESC);

-- Newsletter RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can view subscribers" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'service_role');

-- ============================================
-- 6. ADMIN SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin sessions indexes
CREATE INDEX IF NOT EXISTS idx_admin_token ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_expires ON admin_sessions(expires_at);

-- Admin sessions RLS
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage sessions" ON admin_sessions
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for products
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for site_settings
DROP TRIGGER IF EXISTS update_settings_updated_at ON site_settings;
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate discount percentage
CREATE OR REPLACE FUNCTION calculate_discount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.compare_at_price IS NOT NULL AND NEW.compare_at_price > NEW.price THEN
    NEW.discount_percentage := ROUND(((NEW.compare_at_price - NEW.price) / NEW.compare_at_price) * 100);
  ELSE
    NEW.discount_percentage := 0;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for discount calculation
DROP TRIGGER IF EXISTS calculate_product_discount ON products;
CREATE TRIGGER calculate_product_discount
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION calculate_discount();

-- ============================================
-- VIEWS
-- ============================================

-- View: Products with rating
CREATE OR REPLACE VIEW products_with_rating AS
SELECT 
  p.*,
  COALESCE(AVG(r.rating), 0) as average_rating,
  COUNT(r.id) as reviews_count
FROM products p
LEFT JOIN reviews r ON p.id = r.product_id AND r.is_approved = true
WHERE p.is_active = true
GROUP BY p.id;

-- ============================================
-- SAMPLE DATA (Optional)
-- ============================================

-- Sample categories
INSERT INTO categories (name, slug, display_order) VALUES
('Electronics', 'electronics', 1),
('Fashion', 'fashion', 2),
('Home & Living', 'home-living', 3),
('Sports', 'sports', 4)
ON CONFLICT (slug) DO NOTHING;

-- Sample products (uncomment to add)
-- INSERT INTO products (name, description, price, compare_at_price, images, category_id, stock, is_featured) 
-- SELECT 
--   'Wireless Headphones',
--   'Premium wireless headphones with noise cancellation',
--   79.99,
--   99.99,
--   ARRAY['https://placehold.co/600x600/1A1A2E/FFFFFF?text=Headphones'],
--   id,
--   50,
--   true
-- FROM categories WHERE slug = 'electronics'
-- ON CONFLICT (slug) DO NOTHING;
