import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Reusable MenuItem component with enhanced mobile design
const MenuItem = ({ name, description, price, badge, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
      {/* Image container with proper aspect ratio */}
      <div className="relative w-full h-40 sm:h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        {badge && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
            {badge}
          </span>
        )}
      </div>
      
      {/* Content section with improved spacing */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-bold text-lg">${price}</span>
        </div>
      </div>
    </div>
  );
};

const MenuPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('Drinks');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items from backend
  useEffect(() => {
    setIsVisible(true);
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/menus');
        setMenuItems(res.data || []);
        setError(null);
      } catch {
        setError('Failed to load menu.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Function to render the active section
  const sectionMap = {
    'Drinks': 'Drink',
    'Food': 'Food',
    'Whole Fruits': 'Fruit',
  };
  const renderSection = () => {
    if (loading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    const filtered = menuItems.filter(item => item.section === sectionMap[activeSection]);
    if (filtered.length === 0) return <div className="text-center text-gray-400">No items found.</div>;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((item, idx) => (
          <MenuItem
            key={item._id || idx}
            name={item.name}
            description={item.description}
            price={item.price}
            badge={item.badge}
            image={item.image}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`bg-gradient-to-br from-green-50 to-green-100 min-h-screen transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section with enhanced mobile design */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop&auto=format"
          alt="Fresh Juice Bar"
          className="w-full h-48 sm:h-64 md:h-80 object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">Our Menu</h1>
          <p className="text-sm sm:text-lg md:text-xl text-center max-w-md">Fresh, Healthy, and Bursting with Flavor!</p>
        </div>
      </div>

      {/* Menu Sections Container with improved mobile spacing */}
      <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Section Navigation Buttons - Mobile optimized */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6">
          <button
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeSection === 'Drinks' 
                ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
            }`}
            onClick={() => setActiveSection('Drinks')}
          >
            🥤 Drinks
          </button>
          <button
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeSection === 'Food' 
                ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
            }`}
            onClick={() => setActiveSection('Food')}
          >
            🍽️ Food
          </button>
          <button
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeSection === 'Whole Fruits' 
                ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
            }`}
            onClick={() => setActiveSection('Whole Fruits')}
          >
            🍎 Whole Fruits
          </button>
        </div>

        {/* Section Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {activeSection}
          </h2>
          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Active Section with enhanced animations */}
        <div className="animate-fadeIn">
          {renderSection()}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MenuPage;