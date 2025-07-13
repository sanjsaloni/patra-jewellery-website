import React from 'react';
import ProductCard from './ProductCard';

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
}

interface ProductGridProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  loading: boolean;
  searchedProductId?: string | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  categories, 
  selectedCategory, 
  loading,
  searchedProductId 
}) => {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'All Categories';
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category_id === selectedCategory);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                  <div className="h-8 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {selectedCategory === 'all' ? 'All Products' : getCategoryName(selectedCategory)}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {selectedCategory === 'all' 
              ? 'Explore our complete collection of exquisite gold jewelry'
              : `Discover our beautiful ${getCategoryName(selectedCategory).toLowerCase()} collection`
            }
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('categoryChange', { detail: 'all' }))}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-yellow-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => window.dispatchEvent(new CustomEvent('categoryChange', { detail: category.id }))}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-yellow-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">💎</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Products Found</h3>
            <p className="text-gray-500">
              {selectedCategory === 'all' 
                ? 'No products available at the moment'
                : `No products found in ${getCategoryName(selectedCategory)} category`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                data-product-id={product.id}
                className="transition-all duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;