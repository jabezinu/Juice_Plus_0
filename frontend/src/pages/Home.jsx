import React, { useState, useEffect } from 'react';
import { Leaf, Menu, Users, Phone, ArrowRight, Star, Heart, Zap } from 'lucide-react';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Simulated navigation handlers (replace with actual routing)
  const navigateToPage = (page) => {
    console.log(`Navigating to ${page} page`);
    // Replace with actual navigation logic (e.g., React Router)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">



      {/* Hero Section */}
      <section className={`relative overflow-hidden py-20 lg:py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-yellow-400/20 to-orange-400/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Fresh
                <span className="bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent block">
                  Natural
                </span>
                Delicious
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Experience the pure taste of nature with our handcrafted fruit juices and smoothies. 
                Made fresh daily with the finest organic ingredients.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => navigateToPage('menu')}
                  className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-500 hover:text-white transition-all duration-300">
                  Order Now
                </button>
              </div>
            </div>
            
            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Fruit Icons as placeholders */}
                    <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-6 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🍓</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-6 flex items-center justify-center">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🍊</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 flex items-center justify-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🥝</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-6 flex items-center justify-center">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🫐</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-bounce">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-full p-3 animate-pulse">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-green-600">FreshJuice</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to bringing you the freshest, most nutritious beverages that fuel your body and delight your taste buds.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* About Preview */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded with a passion for healthy living, we source the finest organic fruits to create beverages that nourish your body and soul.
              </p>
              
              <button 
                onClick={() => navigateToPage('about')}
                className="group/btn text-green-600 font-semibold flex items-center space-x-2 hover:text-green-700 transition-colors"
              >
                <span>Learn About Us</span>
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Menu Preview */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-100">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fresh Menu</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From energizing smoothies to refreshing cold-pressed juices, discover our full range of delicious and nutritious beverages.
              </p>
              
              <button 
                onClick={() => navigateToPage('menu')}
                className="group/btn text-orange-600 font-semibold flex items-center space-x-2 hover:text-orange-700 transition-colors"
              >
                <span>View Our Menu</span>
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Contact Preview */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-purple-100">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Phone className="h-8 w-8 text-purple-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Visit our store, call us for orders, or reach out with any questions. We're here to serve you the best fresh juices in town.
              </p>
              
              <button 
                onClick={() => navigateToPage('contact')}
                className="group/btn text-purple-600 font-semibold flex items-center space-x-2 hover:text-purple-700 transition-colors"
              >
                <span>Contact Us</span>
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-500 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Taste the Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of health-conscious customers who have made FreshJuice their go-to destination for premium beverages.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigateToPage('menu')}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Order Online
            </button>
            <button 
              onClick={() => navigateToPage('contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              Find Location
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-orange-500 p-2 rounded-full">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">FreshJuice</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Your destination for fresh, organic, and delicious fruit juices and smoothies. Made with love, served with passion.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => navigateToPage('about')} className="block text-gray-400 hover:text-white transition-colors">About Us</button>
                <button onClick={() => navigateToPage('menu')} className="block text-gray-400 hover:text-white transition-colors">Menu</button>
                <button onClick={() => navigateToPage('contact')} className="block text-gray-400 hover:text-white transition-colors">Contact</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Hours</h4>
              <div className="text-gray-400 space-y-1">
                <p>Mon-Fri: 7AM - 8PM</p>
                <p>Sat-Sun: 8AM - 9PM</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FreshJuice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;