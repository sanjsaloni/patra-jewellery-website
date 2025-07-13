import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Header from '../components/Layout/Header';
import Hero from '../components/Layout/Hero';
import CategorySection from '../components/Categories/CategorySection';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedProducts from '../components/Products/FeaturedProducts';
import ContactSection from '../components/Layout/ContactSection';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  purity: string;
  image_url: string;
  is_featured: boolean;
  in_stock: boolean;
  category_id: string | null;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchedProductId, setSearchedProductId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      setActiveCategory(event.detail);
      setShowAllProducts(true);
      // Scroll to products section
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    window.addEventListener('categoryChange', handleCategoryChange as EventListener);
    return () => {
      window.removeEventListener('categoryChange', handleCategoryChange as EventListener);
    };
  }, []);

  const loadData = async () => {
    try {
      const [productsResult, categoriesResult] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name')
      ]);

      if (productsResult.data) setProducts(productsResult.data);
      if (categoriesResult.data) setCategories(categoriesResult.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShowAllProducts(true);
    // Scroll to products section
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (!showAllProducts) {
      setShowAllProducts(true);
    }
  };

  const handleProductSelect = (productId: string) => {
    setSearchedProductId(productId);
    setShowAllProducts(true);
    // Highlight the selected product temporarily
    setTimeout(() => {
      const productElement = document.querySelector(`[data-product-id="${productId}"]`);
      if (productElement) {
        productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        productElement.classList.add('ring-4', 'ring-yellow-400', 'ring-opacity-75');
        setTimeout(() => {
          productElement.classList.remove('ring-4', 'ring-yellow-400', 'ring-opacity-75');
        }, 3000);
      }
    }, 500);
  };

  const handleCategorySelectFromSearch = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShowAllProducts(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        onProductSelect={handleProductSelect}
        onCategorySelect={handleCategorySelectFromSearch}
      />
      
      <Hero />
      
      <CategorySection 
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />
      
      {!showAllProducts && (
        <FeaturedProducts products={products} />
      )}
      
      {showAllProducts && (
        <ProductGrid 
          products={products}
          categories={categories}
          selectedCategory={activeCategory}
          loading={loading}
          searchedProductId={searchedProductId}
        />
      )}
      
      <ContactSection />
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl text-yellow-400 font-bold mb-4">Patra Jewellery</h3>
              <p className="text-gray-400 mb-6">
                Your trusted destination for authentic gold jewellery. We combine traditional craftsmanship 
                with modern designs to create timeless pieces. Each piece is a testament to our commitment to quality and elegance.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(0, 6).map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategorySelect(category.id)}
                      className="hover:text-white transition-colors text-left"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Gold Jewellery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;