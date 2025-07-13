import React from 'react';
import { Star, Weight, Zap } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group relative">
      {product.is_featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <Star className="h-3 w-3" />
          <span>Featured</span>
        </div>
      )}
      
      <div className="relative overflow-hidden">
        <img
          src={product.image_url && product.image_url.startsWith('data:') 
            ? product.image_url 
            : product.image_url || 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg'}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Weight className="h-4 w-4" />
              <span>{product.weight}g</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>{product.purity}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-yellow-600">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.in_stock
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
        
        <button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;