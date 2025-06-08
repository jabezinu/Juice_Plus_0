import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Users, Phone, ArrowRight, Star, Heart, Zap, Sparkles, Sun, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const JuicePlusHomepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigateToPage = (page) => {
    console.log(`Navigating to ${page} page`);
  };

  const FloatingOrb = ({ delay = 0, size = 'w-4 h-4', color = 'bg-yellow-400' }) => (
    <div 
      className={`absolute ${size} ${color} rounded-full blur-sm opacity-60 animate-pulse`}
      style={{
        animationDelay: `${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${delay}s`
      }}
    />
  );

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated Background */}
      {/* <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-purple-500/10 to-orange-500/20 transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div> */}

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo Animation */}
          <div className={`mb-8 transition-all duration-2000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 via-purple-600 to-orange-600 rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative bg-gradient-to-r from-emerald-500 to-orange-500 p-6 rounded-full">
                <Sparkles className="h-12 w-12 text-white animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>
          </div>

          {/* Main Title with Staggered Animation */}
          <div className="mb-12">
            <h1 className="text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tight">
              {['J', 'U', 'I', 'C', 'E'].map((letter, i) => (
                <span 
                  key={i}
                  className={`inline-block bg-gradient-to-br from-emerald-400 via-purple-400 to-orange-400 bg-clip-text text-transparent transition-all duration-1000 hover:scale-125 cursor-default ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${i * 100}ms`,
                    textShadow: '0 0 50px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
            
            <div className="relative">
              <h2 className={`text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-emerald-200 to-orange-200 bg-clip-text text-transparent transition-all duration-1500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                PLUS
              </h2>
              <div className="absolute -top-4 -right-8 text-2xl animate-bounce">✨</div>
            </div>
          </div>

          {/* Subtitle */}
          <p className={`text-2xl lg:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed transition-all duration-2000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Where <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent font-bold">premium meets pure</span> - 
            Experience the ultimate fusion of exotic fruits, cutting-edge nutrition, and unparalleled taste
          </p>

          {/* Interactive CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-2500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <button 
              onClick={() => navigateToPage('menu')}
              className="group relative bg-gradient-to-r from-emerald-500 via-purple-500 to-orange-500 p-1 rounded-full overflow-hidden transform hover:scale-110 transition-all duration-500"
            >
              <div className="bg-black rounded-full px-12 py-6 relative z-10 group-hover:bg-transparent transition-all duration-500">
                <span className="text-white group-hover:text-white font-bold text-xl flex items-center space-x-3">
                  <Zap className="h-6 w-6 group-hover:animate-pulse" />
                  <Link to="/"><span>Explore Menu</span></Link>                  
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            
            <button className="group border-2 border-emerald-400 text-emerald-400 px-12 py-6 rounded-full font-bold text-xl hover:bg-emerald-400 hover:text-black transition-all duration-500 transform hover:scale-110 relative overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <Sun className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
                <span>Order Fresh</span>
              </span>
            </button>
          </div>
        </div>

        {/* Floating Juice Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large Floating Fruits */}
          <div className="absolute top-20 left-10 text-8xl opacity-20 animate-float">🍊</div>
          <div className="absolute top-40 right-20 text-6xl opacity-30 animate-float" style={{ animationDelay: '1s' }}>🥭</div>
          <div className="absolute bottom-32 left-20 text-7xl opacity-25 animate-float" style={{ animationDelay: '2s' }}>🍓</div>
          <div className="absolute top-60 left-1/2 text-5xl opacity-40 animate-float" style={{ animationDelay: '0.5s' }}>🥝</div>
          <div className="absolute bottom-20 right-10 text-9xl opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>🫐</div>
        </div>
      </section>

      {/* Features Section with Glass Morphism */}
      <section className="relative z-10 py-32 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl lg:text-7xl font-black text-white mb-8">
              Why Choose 
              <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent block">
                Juice Plus?
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We don't just make juice - we craft liquid perfection that transforms your day
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* About Preview - Glass Card */}
            <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-emerald-400/50 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl w-20 h-20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Users className="h-10 w-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-6">Our Legacy</h3>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Born from a revolutionary vision to redefine what premium juice means. We source exotic fruits from pristine locations worldwide.
                </p>
                
                <button 
                  onClick={() => navigateToPage('about')}
                  className="group/btn text-emerald-400 font-bold text-lg flex items-center space-x-3 hover:text-emerald-300 transition-colors"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            {/* Menu Preview - Glass Card */}
            <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-orange-400/50 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-orange-400 to-pink-600 rounded-2xl w-20 h-20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Droplets className="h-10 w-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-6">Liquid Art</h3>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  From molecular gastronomy smoothies to cold-pressed masterpieces. Each drink is a symphony of flavors crafted by juice artisans.
                </p>
                
                <button 
                  onClick={() => navigateToPage('menu')}
                  className="group/btn text-orange-400 font-bold text-lg flex items-center space-x-3 hover:text-orange-300 transition-colors"
                >
                  <span>View Creations</span>
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            {/* Contact Preview - Glass Card */}
            <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-purple-400/50 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-purple-400 to-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Phone className="h-10 w-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-6">Connect</h3>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Step into our flagship experience center or reach out to our juice concierge team. Premium service for premium tastes.
                </p>
                
                <button 
                  onClick={() => navigateToPage('contact')}
                  className="group/btn text-purple-400 font-bold text-lg flex items-center space-x-3 hover:text-purple-300 transition-colors"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative z-10 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-purple-600 to-orange-600 opacity-90" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-12 w-12 text-yellow-400 fill-current animate-pulse" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            
            <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Ready for the
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Ultimate Experience?
              </span>
            </h2>
            
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the exclusive community of taste connoisseurs who demand nothing but extraordinary
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button 
              onClick={() => navigateToPage('menu')}
              className="group bg-white text-black px-16 py-8 rounded-full font-black text-2xl hover:bg-yellow-300 transform hover:scale-110 transition-all duration-500 shadow-2xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-4">
                <Sparkles className="h-8 w-8 group-hover:animate-spin" />
                <span>Order Premium</span>
              </span>
            </button>
            
            <button 
              onClick={() => navigateToPage('contact')}
              className="group border-4 border-white text-white px-16 py-8 rounded-full font-black text-2xl hover:bg-white hover:text-black transition-all duration-500 transform hover:scale-110"
            >
              <span className="flex items-center space-x-4">
                <Heart className="h-8 w-8 group-hover:animate-pulse" />
                <span>Visit Us</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative z-10 bg-black/90 backdrop-blur-xl border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-to-r from-emerald-500 to-orange-500 p-4 rounded-2xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <span className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
                  Juice Plus
                </span>
              </div>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                Redefining premium beverages through innovation, quality, and an unwavering commitment to extraordinary taste experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white text-xl mb-6">Experience</h4>
              <div className="space-y-4">
                <button onClick={() => navigateToPage('about')} className="block text-gray-400 hover:text-emerald-400 transition-colors text-lg">Our Story</button>
                <button onClick={() => navigateToPage('menu')} className="block text-gray-400 hover:text-emerald-400 transition-colors text-lg">Premium Menu</button>
                <button onClick={() => navigateToPage('contact')} className="block text-gray-400 hover:text-emerald-400 transition-colors text-lg">Contact</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white text-xl mb-6">Hours</h4>
              <div className="text-gray-400 space-y-2 text-lg">
                <p>Monday - Friday</p>
                <p className="text-emerald-400 font-semibold">7:00 AM - 9:00 PM</p>
                <p>Weekend</p>
                <p className="text-emerald-400 font-semibold">8:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-12 text-center">
            <p className="text-gray-500 text-lg">
              © 2025 <span className="text-emerald-400 font-semibold">Juice Plus</span>. Crafting liquid perfection.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(-10px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default JuicePlusHomepage;