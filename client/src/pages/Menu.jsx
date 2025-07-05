import React, { useEffect } from 'react';
import { Star, StarHalf, Loader2, AlertCircle, ChefHat, Utensils } from 'lucide-react';
import useMenuStore from '../stores/menuStore';
import Footer from '../components/Footer';

const Menu = () => {
  const {
    categories,
    selectedCategory,
    menuItems,
    loading,
    error,
    menuLoading,
    rating,
    ratingMsg,
    menuRatings,
    fetchCategories,
    fetchMenuItems,
    handleRatingChange,
    submitRating
  } = useMenuStore();

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-500 to-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <ChefHat className="w-12 h-12 text-white" />
            <h1 className="text-4xl md:text-6xl font-bold text-center text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
              Delicious Menu
            </h1>
            <Utensils className="w-12 h-12 text-white" />
          </div>
          <p className="text-xl md:text-2xl text-center text-orange-100 max-w-3xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500 mr-3" />
              <span className="text-lg text-gray-600">Loading categories...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
            <div className="flex items-center justify-center text-red-600">
              <AlertCircle className="w-6 h-6 mr-2" />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Categories */}
        {!loading && categories && categories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Category</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {categories.map((cat) => (
                <button
                  key={cat._id || cat.id}
                  className={`
                    px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                    ${selectedCategory === (cat._id || cat.id)
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                    }
                  `}
                  onClick={() => fetchMenuItems(cat._id || cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {!loading && (!categories || categories.length === 0) && (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
              <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <span className="text-lg text-gray-600">No categories found.</span>
            </div>
          </div>
        )}

        {/* Menu Items */}
        {selectedCategory && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Delicious Menu</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
            </div>
            
            {menuLoading ? (
              <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
                <div className="flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-orange-500 mr-3" />
                  <span className="text-lg text-gray-600">Loading menu items...</span>
                </div>
              </div>
            ) : menuItems && menuItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems.map((item) => (
                  <div key={item._id || item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                    {/* Image */}
                    <div className="relative flex items-center justify-center bg-gray-100 min-h-[12rem] max-h-64 overflow-hidden rounded-t-2xl">
                      <img
                        src={item.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                        onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
                        style={{ width: 'auto', height: 'auto' }}
                      />
                      <div className="absolute top-4 right-4 bg-orange-500 text-white rounded-full px-3 py-1 shadow-sm">
                        <span className="text-white font-bold text-lg">{item.badge}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
                        <h3 className="text-l font-bold text-gray-600">{item.price} Birr</h3>
                      </div>
                      <h3 className="text-l font-bold text-red-400">{item.outOfStock ? 'Sold Out' : ''}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                      
                      {/* Rating Display */}
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center">
                          {menuRatings[item._id || item.id]?.avgRating 
                            ? renderStars(menuRatings[item._id || item.id].avgRating)
                            : <span className="text-gray-400">No ratings yet</span>
                          }
                        </div>
                        {menuRatings[item._id || item.id]?.avgRating && (
                          <span className="text-sm text-gray-500">
                            {menuRatings[item._id || item.id].avgRating.toFixed(1)}
                          </span>
                        )}
                      </div>

                      {/* Star Rating Input */}
                      <div className="border-t-2 border-gray-200 pt-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-700">Rate this dish:</div>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => {
                              const currentRating = rating[item._id || item.id] || 0;
                              return (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => handleRatingChange(item._id || item.id, star)}
                                  className={`w-8 h-8 focus:outline-none transition-colors ${star <= currentRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                                >
                                  <Star className="w-full h-full" fill="currentColor" />
                                </button>
                              );
                            })}
                            <button
                              onClick={() => submitRating(item._id || item.id)}
                              disabled={!rating[item._id || item.id]}
                              className="ml-2 px-3 py-1 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md hover:from-orange-600 hover:to-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Submit
                            </button>
                          </div>
                          {ratingMsg[item._id || item.id] && (
                            <p className="mt-1 text-sm text-green-600 font-medium">
                              {ratingMsg[item._id || item.id]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
                  <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600">No menu items found for this category.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Menu;