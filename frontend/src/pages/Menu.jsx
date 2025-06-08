import React, { useState, useEffect } from 'react';

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

  // Fade-in animation on page load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to render the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'Drinks':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <MenuItem
              name="Green Goddess"
              description="Spinach, kale, green apple, cucumber - your daily dose of greens"
              price="6.99"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Tropical Sunrise"
              description="Orange, pineapple, mango - taste the sunshine in every sip"
              price="5.99"
              image="https://images.unsplash.com/photo-1622597627793-d8e9a0e4a3fb?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Berry Blast"
              description="Strawberry, blueberry, raspberry - antioxidant powerhouse"
              price="6.49"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Immunity Booster"
              description="Carrot, ginger, orange, turmeric - fuel your immune system"
              price="5.49"
              image="https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Detox Delight"
              description="Beetroot, apple, lemon, mint - cleanse and refresh naturally"
              price="5.99"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Peanut Butter Power"
              description="Banana, peanut butter, almond milk - protein-packed energy"
              price="7.49"
              image="https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Mango Magic"
              description="Mango, coconut water, lime - tropical paradise in a glass"
              price="5.99"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1605027990121-cbae9cafe2f0?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Watermelon Refresher"
              description="Watermelon, mint, lime - summer hydration at its finest"
              price="4.99"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Acai Energy"
              description="Acai, banana, blueberry, almond milk - superfood energy boost"
              price="7.99"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1574635174964-65d0dd30b52b?w=400&h=300&fit=crop&auto=format"
            />
          </div>
        );
      case 'Food':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <MenuItem
              name="Acai Bowl"
              description="Acai base with granola, banana, berries - superfood breakfast"
              price="8.99"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Avocado Toast"
              description="Whole grain toast, avocado, chili flakes - simple & nutritious"
              price="6.49"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Peanut Butter Banana Toast"
              description="Nut butter, sliced banana, honey - comfort food made healthy"
              price="5.99"
              image="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Chia Pudding"
              description="Chia seeds soaked in almond milk, topped with fruit"
              price="5.49"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Hummus Wrap"
              description="Hummus, cucumber, tomato, spinach in a soft tortilla wrap"
              price="7.49"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1564156081810-0ebea8189019?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Falafel Bowl"
              description="Falafel, quinoa, hummus, veggies - Mediterranean goodness"
              price="9.99"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Granola Parfait"
              description="Yogurt, granola, honey, berries - layers of deliciousness"
              price="5.99"
              image="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Protein Energy Balls"
              description="Dates, oats, nut butter, seeds - grab-and-go energy"
              price="4.99"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Quinoa Salad"
              description="Quinoa, avocado, chickpeas, lemon dressing - protein packed"
              price="8.49"
              badge="Vegan"
              image="https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?w=400&h=300&fit=crop&auto=format"
            />
          </div>
        );
      case 'Whole Fruits':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <MenuItem
              name="Banana"
              description="Perfectly ripe banana - nature's energy bar"
              price="0.99"
              image="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Red Apple"
              description="Crisp red apple - classic and refreshing"
              price="1.49"
              image="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Green Apple"
              description="Tart green apple - perfect for a healthy snack"
              price="1.49"
              image="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Orange"
              description="Juicy orange - packed with vitamin C"
              price="1.99"
              image="https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Pineapple"
              description="Fresh cut pineapple - tropical sweetness"
              price="3.99"
              image="https://images.unsplash.com/photo-1544806753-6ad5ac882d5d?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Watermelon Slices"
              description="Refreshing watermelon slices - summer hydration"
              price="2.99"
              image="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Grapes"
              description="Sweet grapes - red or green variety"
              price="2.99"
              image="https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Mango"
              description="Sliced mango - tropical paradise"
              price="2.99"
              image="https://images.unsplash.com/photo-1605027990121-cbae9cafe2f0?w=400&h=300&fit=crop&auto=format"
            />
            <MenuItem
              name="Kiwi"
              description="Fresh cut kiwi - tangy and nutritious"
              price="1.99"
              image="https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400&h=300&fit=crop&auto=format"
            />
          </div>
        );
      default:
        return null;
    }
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