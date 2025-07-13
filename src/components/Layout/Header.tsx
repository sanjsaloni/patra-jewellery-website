import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import SearchModal from '../Search/SearchModal';
import { Link } from 'react-router-dom';

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Array<{ id: string; name: string }>;
  onProductSelect?: (productId: string) => void;
  onCategorySelect?: (categoryId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeCategory, 
  onCategoryChange, 
  categories,
  onProductSelect,
  onCategorySelect 
}) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const handleProductSelect = (productId: string) => {
    if (onProductSelect) {
      onProductSelect(productId);
    }
    // Scroll to products section
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCategorySelect = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
    // Scroll to products section
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Patra Jewellery</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Home</a>
            <a href="#products" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Products</a>
            <a href="#categories" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Categories</a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Contact</a>
          </nav>
          <Link to="/admin/login"
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">
          Admin Login
        </Link>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label="Search"
              >
                <Search className="h-6 w-6" />
              </button>
            {/* <ShoppingBag className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" /> */}
          </div>
        </div>
    </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductSelect={handleProductSelect}
        onCategorySelect={handleCategorySelect}
      />
    </>
  );
};

export default Header;