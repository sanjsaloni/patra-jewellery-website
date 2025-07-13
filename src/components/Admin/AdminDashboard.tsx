// import React, { useState, useEffect } from 'react';
// import { 
//   LayoutDashboard, 
//   Package, 
//   FolderOpen, 
//   LogOut, 
//   Plus,
//   TrendingUp,
//   Users,
//   ShoppingBag
// } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import { supabase } from '../../lib/supabase';
// import ProductManagement from './ProductManagement';
// import CategoryManagement from './CategoryManagement';

// const AdminDashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalCategories: 0,
//     featuredProducts: 0,
//     inStockProducts: 0
//   });
//   const { logout } = useAuth();

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       const [productsResult, categoriesResult] = await Promise.all([
//         supabase.from('products').select('*'),
//         supabase.from('categories').select('*')
//       ]);

//       const products = productsResult.data || [];
//       const categories = categoriesResult.data || [];

//       setStats({
//         totalProducts: products.length,
//         totalCategories: categories.length,
//         featuredProducts: products.filter(p => p.is_featured).length,
//         inStockProducts: products.filter(p => p.in_stock).length
//       });
//     } catch (error) {
//       console.error('Error loading stats:', error);
//     }
//   };

//   const handleLogout = async () => {
//     await logout();
//   };

//   const navigation = [
//     { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
//     { id: 'products', name: 'Products', icon: Package },
//     { id: 'categories', name: 'Categories', icon: FolderOpen },
//   ];

//   const StatCard = ({ title, value, icon: Icon, color }: {
//     title: string;
//     value: number;
//     icon: React.ElementType;
//     color: string;
//   }) => (
//     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
//         </div>
//         <div className={`p-3 rounded-full ${color}`}>
//           <Icon className="h-6 w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
//         <div className="flex items-center justify-center h-16 border-b border-gray-200">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
//               <LayoutDashboard className="h-5 w-5 text-white" />
//             </div>
//             <span className="text-xl font-bold text-gray-900">Admin Panel</span>
//           </div>
//         </div>
        
//         <nav className="mt-8 px-4">
//           {navigation.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg mb-2 transition-all duration-200 ${
//                 activeTab === item.id
//                   ? 'bg-yellow-50 text-yellow-600 border-r-4 border-yellow-600'
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               <item.icon className="h-5 w-5" />
//               <span className="font-medium">{item.name}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="absolute bottom-4 left-4 right-4">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
//           >
//             <LogOut className="h-5 w-5" />
//             <span className="font-medium">Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="ml-64 p-8">
//         <div className="max-w-7xl mx-auto">
//           {activeTab === 'dashboard' && (
//             <div>
//               <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//                 <p className="text-gray-600 mt-2">Overview of your jewelry store</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 <StatCard
//                   title="Total Products"
//                   value={stats.totalProducts}
//                   icon={Package}
//                   color="bg-blue-500"
//                 />
//                 <StatCard
//                   title="Categories"
//                   value={stats.totalCategories}
//                   icon={FolderOpen}
//                   color="bg-green-500"
//                 />
//                 <StatCard
//                   title="Featured Products"
//                   value={stats.featuredProducts}
//                   icon={TrendingUp}
//                   color="bg-yellow-500"
//                 />
//                 <StatCard
//                   title="In Stock"
//                   value={stats.inStockProducts}
//                   icon={ShoppingBag}
//                   color="bg-purple-500"
//                 />
//               </div>

//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <button
//                     onClick={() => setActiveTab('products')}
//                     className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <Plus className="h-5 w-5 text-gray-600" />
//                     <span className="font-medium text-gray-700">Add New Product</span>
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('categories')}
//                     className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <Plus className="h-5 w-5 text-gray-600" />
//                     <span className="font-medium text-gray-700">Add New Category</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'products' && <ProductManagement onStatsUpdate={loadStats} />}
//           {activeTab === 'categories' && <CategoryManagement onStatsUpdate={loadStats} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  LogOut,
  Plus,
  TrendingUp,
  Users,
  ShoppingBag,
  Menu
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    featuredProducts: 0,
    inStockProducts: 0
  });
  const { logout } = useAuth();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [productsResult, categoriesResult] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('categories').select('*')
      ]);

      const products = productsResult.data || [];
      const categories = categoriesResult.data || [];

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        featuredProducts: products.filter(p => p.is_featured).length,
        inStockProducts: products.filter(p => p.in_stock).length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'categories', name: 'Categories', icon: FolderOpen }
  ];

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
  }) => (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className={`fixed z-40 md:static inset-y-0 left-0 w-64 bg-white shadow-lg transform md:translate-x-0 transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Admin Panel</span>
          </div>
          {/* Close Button (Mobile) */}
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="mt-6 px-4">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false); // Close sidebar on mobile
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg mb-2 transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-yellow-50 text-yellow-600 border-r-4 border-yellow-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-4 md:p-8">
        {/* Top bar for mobile */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Overview of your jewelry store</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Products" value={stats.totalProducts} icon={Package} color="bg-blue-500" />
              <StatCard title="Categories" value={stats.totalCategories} icon={FolderOpen} color="bg-green-500" />
              <StatCard title="Featured Products" value={stats.featuredProducts} icon={TrendingUp} color="bg-yellow-500" />
              <StatCard title="In Stock" value={stats.inStockProducts} icon={ShoppingBag} color="bg-purple-500" />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('products')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Add New Product</span>
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Add New Category</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && <ProductManagement onStatsUpdate={loadStats} />}
        {activeTab === 'categories' && <CategoryManagement onStatsUpdate={loadStats} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
