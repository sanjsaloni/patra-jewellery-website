/*
  # Add More Jewelry Categories

  1. New Categories
    - Add comprehensive jewelry categories including:
      - Rings (existing)
      - Necklaces (existing) 
      - Bangles (existing)
      - Earrings
      - Bracelets
      - Pendants
      - Chains
      - Anklets
      - Nose Rings
      - Toe Rings
      - Mangalsutra
      - Chokers

  2. Sample Data
    - Insert categories with descriptions and image URLs
    - Use high-quality jewelry images from Pexels
*/

-- Insert additional jewelry categories
INSERT INTO categories (name, description, image_url) VALUES
  ('Earrings', 'Elegant gold earrings in various designs from studs to chandeliers', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg'),
  ('Bracelets', 'Beautiful gold bracelets and tennis bracelets for every occasion', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg'),
  ('Pendants', 'Stunning gold pendants with intricate designs and precious stones', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg'),
  ('Chains', 'Classic and contemporary gold chains in various lengths and styles', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg'),
  ('Anklets', 'Delicate gold anklets perfect for traditional and modern wear', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg'),
  ('Nose Rings', 'Traditional and modern gold nose rings with beautiful craftsmanship', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg'),
  ('Toe Rings', 'Elegant gold toe rings for traditional ceremonies and daily wear', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg'),
  ('Mangalsutra', 'Sacred gold mangalsutra designs for married women', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg'),
  ('Chokers', 'Trendy gold choker necklaces for contemporary fashion', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg'),
  ('Sets', 'Complete jewelry sets including necklace, earrings, and more', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg'),
  ('Watches', 'Luxury gold watches combining elegance with functionality', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg'),
  ('Cufflinks', 'Premium gold cufflinks for formal and business attire', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg')
ON CONFLICT (name) DO NOTHING;