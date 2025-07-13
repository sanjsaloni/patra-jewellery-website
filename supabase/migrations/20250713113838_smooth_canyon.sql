/*
  # Gold Jewelry Website Database Schema

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password_hash` (text)
      - `created_at` (timestamp)
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `weight` (decimal)
      - `purity` (text)
      - `category_id` (uuid, foreign key)
      - `image_url` (text)
      - `is_featured` (boolean)
      - `in_stock` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin access
*/

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL DEFAULT 0,
  weight decimal(8,3) DEFAULT 0,
  purity text DEFAULT '22K',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies for admins table (only admins can access)
CREATE POLICY "Admins can read own data"
  ON admins
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policies for categories (public read, admin write)
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for products (public read, admin write)
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default categories
INSERT INTO categories (name, description, image_url) VALUES
('Rings', 'Beautiful gold rings for every occasion', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg'),
('Necklaces', 'Elegant gold necklaces and chains', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg'),
('Earrings', 'Stunning gold earrings collection', 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg'),
('Bracelets', 'Exquisite gold bracelets and bangles', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg'),
('Pendants', 'Divine gold pendants and lockets', 'https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg');

-- Insert sample products
INSERT INTO products (name, description, price, weight, purity, category_id, image_url, is_featured, in_stock)
SELECT 
  'Classic Gold Ring',
  'A timeless classic gold ring perfect for daily wear',
  25000.00,
  4.500,
  '22K',
  (SELECT id FROM categories WHERE name = 'Rings' LIMIT 1),
  'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg',
  true,
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE name = 'Rings');

INSERT INTO products (name, description, price, weight, purity, category_id, image_url, is_featured, in_stock)
SELECT 
  'Diamond Cut Chain',
  'Elegant diamond cut gold chain with intricate patterns',
  45000.00,
  12.300,
  '22K',
  (SELECT id FROM categories WHERE name = 'Necklaces' LIMIT 1),
  'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg',
  true,
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE name = 'Necklaces');

INSERT INTO products (name, description, price, weight, purity, category_id, image_url, is_featured, in_stock)
SELECT 
  'Traditional Jhumkas',
  'Beautiful traditional gold jhumkas with intricate design',
  18000.00,
  6.200,
  '22K',
  (SELECT id FROM categories WHERE name = 'Earrings' LIMIT 1),
  'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg',
  false,
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE name = 'Earrings');