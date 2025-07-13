/*
  # Add Sample Products for New Categories

  1. Sample Products
    - Add products for each category to showcase the website
    - Include various price ranges and designs
    - Use realistic product names and descriptions
*/

-- Insert sample products for different categories
INSERT INTO products (name, description, price, weight, purity, category_id, image_url, is_featured, in_stock) 
SELECT 
  product_data.name,
  product_data.description,
  product_data.price,
  product_data.weight,
  product_data.purity,
  c.id,
  product_data.image_url,
  product_data.is_featured,
  product_data.in_stock
FROM (
  VALUES 
    -- Earrings
    ('Diamond Stud Earrings', 'Classic diamond stud earrings in 22K gold setting', 25000, 4.5, '22K', 'Earrings', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', true, true),
    ('Chandelier Earrings', 'Elegant chandelier earrings with intricate gold work', 35000, 8.2, '22K', 'Earrings', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', false, true),
    ('Hoop Earrings', 'Modern gold hoop earrings perfect for daily wear', 15000, 3.1, '18K', 'Earrings', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', false, true),
    
    -- Bracelets
    ('Tennis Bracelet', 'Sparkling tennis bracelet with diamonds', 45000, 12.5, '22K', 'Bracelets', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', true, true),
    ('Chain Bracelet', 'Classic gold chain bracelet for everyday elegance', 18000, 6.8, '18K', 'Bracelets', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', false, true),
    
    -- Pendants
    ('Heart Pendant', 'Beautiful heart-shaped pendant with ruby center', 22000, 5.2, '22K', 'Pendants', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', false, true),
    ('Om Pendant', 'Sacred Om symbol pendant in pure gold', 28000, 7.1, '24K', 'Pendants', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', true, true),
    
    -- Chains
    ('Box Chain', 'Sturdy box chain perfect for pendants', 32000, 15.3, '22K', 'Chains', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', false, true),
    ('Rope Chain', 'Twisted rope design chain in yellow gold', 38000, 18.7, '22K', 'Chains', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', false, true),
    
    -- Anklets
    ('Delicate Anklet', 'Thin gold anklet with small charms', 12000, 2.8, '18K', 'Anklets', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', false, true),
    ('Traditional Anklet', 'Heavy traditional anklet with bells', 25000, 8.9, '22K', 'Anklets', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', false, true),
    
    -- Nose Rings
    ('Diamond Nose Pin', 'Tiny diamond nose pin in gold setting', 8000, 0.5, '18K', 'Nose Rings', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', false, true),
    ('Traditional Nath', 'Large traditional nose ring with pearls', 35000, 12.2, '22K', 'Nose Rings', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', true, true),
    
    -- Toe Rings
    ('Simple Toe Ring', 'Minimalist toe ring in yellow gold', 3500, 1.2, '18K', 'Toe Rings', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', false, true),
    ('Floral Toe Ring', 'Toe ring with floral design and small gems', 6500, 2.1, '22K', 'Toe Rings', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', false, true),
    
    -- Mangalsutra
    ('Traditional Mangalsutra', 'Classic black bead mangalsutra with gold pendant', 55000, 25.8, '22K', 'Mangalsutra', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', true, true),
    ('Modern Mangalsutra', 'Contemporary design mangalsutra for modern brides', 42000, 18.5, '22K', 'Mangalsutra', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', false, true),
    
    -- Chokers
    ('Pearl Choker', 'Elegant pearl choker with gold accents', 28000, 8.7, '18K', 'Chokers', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', false, true),
    ('Diamond Choker', 'Stunning diamond choker for special occasions', 85000, 15.2, '22K', 'Chokers', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', true, true),
    
    -- Sets
    ('Bridal Set', 'Complete bridal jewelry set with necklace, earrings, and maang tikka', 125000, 45.8, '22K', 'Sets', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', true, true),
    ('Party Wear Set', 'Elegant party wear set perfect for celebrations', 75000, 28.3, '22K', 'Sets', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', false, true),
    
    -- Watches
    ('Gold Watch', 'Luxury gold watch with diamond markers', 95000, 35.2, '18K', 'Watches', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', true, true),
    ('Vintage Watch', 'Classic vintage-style gold watch', 65000, 28.7, '22K', 'Watches', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', false, true),
    
    -- Cufflinks
    ('Diamond Cufflinks', 'Premium diamond cufflinks in gold setting', 45000, 8.5, '18K', 'Cufflinks', 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg', false, true),
    ('Classic Cufflinks', 'Timeless gold cufflinks for formal wear', 25000, 6.2, '22K', 'Cufflinks', 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg', false, true)
) AS product_data(name, description, price, weight, purity, category_name, image_url, is_featured, in_stock)
JOIN categories c ON c.name = product_data.category_name
WHERE NOT EXISTS (
  SELECT 1 FROM products p WHERE p.name = product_data.name
);