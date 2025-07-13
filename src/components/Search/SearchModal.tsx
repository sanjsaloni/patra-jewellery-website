import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Package, FolderOpen } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductSelect: (productId: string) => void;
  onCategorySelect: (categoryId: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  onProductSelect, 
  onCategorySelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'categories'>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
      // Focus search input when modal opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      // Reset search when modal closes
      setSearchTerm('');
      setFilteredProducts([]);
      setFilteredCategories([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim()) {
      filterResults();
    } else {
      setFilteredProducts([]);
      setFilteredCategories([]);
    }
  }, [searchTerm, products, categories]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsResult, categoriesResult] = await Promise.all([
        supabase.from('products').select('*').eq('in_stock', true),
        supabase.from('categories').select('*')
      ]);

      if (productsResult.data) setProducts(productsResult.data);
      if (categoriesResult.data) setCategories(categoriesResult.data);
    } catch (error) {
      console.error('Error loading search data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterResults = () => {
    const term = searchTerm.toLowerCase().trim();
    
    const matchedProducts = products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.purity.toLowerCase().includes(term)
    );

    const matchedCategories = categories.filter(category =>
      category.name.toLowerCase().includes(term) ||
      category.description.toLowerCase().includes(term)
    );

    setFilteredProducts(matchedProducts);
    setFilteredCategories(matchedCategories);
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Uncategorized';
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleProductClick = (productId: string) => {
    onProductSelect(productId);
    onClose();
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const totalResults = filteredProducts.length + filteredCategories.length;
  const showProducts = activeTab === 'all' || activeTab === 'products';
  const showCategories = activeTab === 'all' || activeTab === 'categories';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Search Jewelry</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for products, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Filter Tabs */}
          {searchTerm && (
            <div className="flex space-x-1 mt-4 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All ({totalResults})
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Products ({filteredProducts.length})
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'categories'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Categories ({filteredCategories.length})
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-96">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            </div>
          ) : !searchTerm ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Start typing to search for products and categories</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No results found for "{searchTerm}"</p>
              <p className="text-sm text-gray-400 mt-2">Try different keywords or browse our categories</p>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Categories Results */}
              {showCategories && filteredCategories.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Categories ({filteredCategories.length})
                  </h3>
                  <div className="space-y-2">
                    {filteredCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <img
                          src={category.image_url && category.image_url.startsWith('data:') 
                            ? category.image_url 
                            : category.image_url || 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg'}
                          alt={category.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{category.name}</h4>
                          <p className="text-sm text-gray-500 line-clamp-1">{category.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Results */}
              {showProducts && filteredProducts.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Products ({filteredProducts.length})
                  </h3>
                  <div className="space-y-2">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <img
                          src={product.image_url && product.image_url.startsWith('data:') 
                            ? product.image_url 
                            : product.image_url || 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg'}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            <span className="text-lg font-bold text-yellow-600">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{getCategoryName(product.category_id)}</span>
                            <span>•</span>
                            <span>{product.weight}g</span>
                            <span>•</span>
                            <span>{product.purity}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;