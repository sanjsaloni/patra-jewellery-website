import React from 'react';

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
}

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const featuredProducts = products.filter(product => product.is_featured).slice(0, 4);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-amber-50 aspect-square mb-6">
                <img
                  src={product.image_url && product.image_url.startsWith('data:') 
                    ? product.image_url 
                    : product.image_url || 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;