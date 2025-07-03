import React, { useState, useEffect, useRef } from 'react';
import { Star, Play, ArrowRight, Coffee, Sparkles, Heart, Award, Zap, Globe, Users, ChevronDown, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [coffeeSteam, setCoffeeSteam] = useState([]);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Generate steam particles
    const steamParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setCoffeeSteam(steamParticles);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(testimonialInterval);
  }, []);

  const testimonials = [
    {
      text: "This isn't just coffee – it's a transcendent experience. Every sip tells the story of Hawaii's volcanic soil.",
      author: "Sarah Chen",
      title: "Coffee Connoisseur",
      rating: 5,
      image: "👩‍🦱"
    },
    {
      text: "Akaka Coffee has completely revolutionized my morning routine. The complexity of flavors is absolutely extraordinary.",
      author: "Marcus Rodriguez",
      title: "Food Critic",
      rating: 5,
      image: "👨‍🍳"
    },
    {
      text: "As a professional barista, I can confidently say this is the finest coffee I've ever experienced. Pure artistry.",
      author: "Elena Nakamura",
      title: "Master Barista",
      rating: 5,
      image: "👩‍🚀"
    }
  ];

  const premiumBlends = [
    {
      name: "Volcanic Majesty",
      description: "Rare beans grown in volcanic soil, with notes of dark chocolate, caramel, and hints of tropical fruit",
      price: "$89.99",
      originalPrice: "$129.99",
      badge: "LIMITED EDITION",
      rarity: "Only 500 bags available",
      image: "🌋",
      gradient: "from-red-600 via-orange-500 to-yellow-400"
    },
    {
      name: "Golden Sunrise",
      description: "Handpicked at dawn, featuring bright citrus notes with a silky smooth finish",
      price: "$64.99",
      originalPrice: "$84.99",
      badge: "AWARD WINNER",
      rarity: "Gold Medal - International Coffee Awards",
      image: "🌅",
      gradient: "from-yellow-400 via-orange-400 to-pink-400"
    },
    {
      name: "Mystical Moonbeam",
      description: "Night-harvested premium beans with exotic floral notes and a whisper of vanilla",
      price: "$74.99",
      originalPrice: "$99.99",
      badge: "CHEF'S CHOICE",
      rarity: "Recommended by Michelin-starred chefs",
      image: "🌙",
      gradient: "from-purple-600 via-blue-500 to-indigo-400"
    }
  ];

  const FloatingCoffeeBean = ({ delay = 0, size = 'w-4 h-4' }) => (
    <div 
      className={`absolute ${size} bg-amber-800 rounded-full opacity-20 animate-float`}
      style={{
        animationDelay: `${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );

  const ParallaxElement = ({ children, speed = 0.5, className = '' }) => (
    <div 
      className={className}
      style={{
        transform: `translateY(${scrollY * speed}px)`,
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Floating Coffee Beans */}
      {Array.from({ length: 20 }, (_, i) => (
        <FloatingCoffeeBean key={i} delay={i * 0.5} />
      ))}

      {/* Hero Section - Absolutely Magnificent */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32">
        {/* Dynamic Background with Multiple Gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-tl from-yellow-900 via-transparent to-purple-900 opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)]" />
        </div>

        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 border border-amber-400/20 rounded-full animate-spin"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${20 + i * 5}s`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Floating Badge */}
          <div className="mb-8 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
            <span className="text-sm font-medium text-amber-200">Addis Ababa's #1 Premium Coffee Experience</span>
            <Award className="h-5 w-5 text-amber-400" />
          </div>

          {/* Main Title with Spectacular Effects */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 animate-pulse">
              AKAKA
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              COFFEE
            </span>
          </h1>

          {/* Subtitle with Typewriter Effect */}
          <p className="text-xl md:text-3xl text-amber-100 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
            Where <span className="text-amber-300 font-bold">volcanic soil</span> meets <span className="text-orange-300 font-bold">artisan craftsmanship</span> to create the world's most extraordinary coffee experience
          </p>

          {/* CTA Buttons with Incredible Effects */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/">
              <button className="group relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-amber-500/50 transform hover:scale-110 transition-all duration-300">
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <Play className="h-6 w-6" />
                <span>Experience the Magic</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            </Link>
            
            <Link to="/about">
            <button className="group relative overflow-hidden border-2 border-amber-400 text-amber-400 px-12 py-6 rounded-full font-bold text-xl hover:text-black transition-all duration-300">
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <Coffee className="h-6 w-6" />
                <span>Discover Our Story</span>
                <Sparkles className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-amber-400 mx-auto animate-pulse" />
          </div>
        </div>

        {/* Coffee Steam Animation */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          {coffeeSteam.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                left: `${particle.x}px`,
                bottom: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                animation: `steam ${particle.speed + 2}s infinite linear`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Statistics Section - Mind-Blowing */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/50 to-orange-900/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Coffee Lovers", icon: Heart },
              { number: "100%", label: "Organic", icon: Globe },
              { number: "48H", label: "Fresh Roasted", icon: Zap }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <stat.icon className="h-8 w-8 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-amber-200 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Blends - Absolutely Stunning */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-900/20 to-black" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-6">
              PREMIUM COLLECTION
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Discover our legendary blends, each one a masterpiece crafted from the world's rarest beans
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {premiumBlends.map((blend, index) => (
              <div key={index} className="group relative">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black to-gray-900 p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-amber-500/30">
                  {/* Badge */}
                  <div className={`absolute top-4 right-4 bg-gradient-to-r ${blend.gradient} text-white px-4 py-2 rounded-full text-xs font-bold`}>
                    {blend.badge}
                  </div>

                  {/* Blend Image */}
                  <div className="text-center mb-6">
                    <div className="text-8xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {blend.image}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">{blend.name}</h3>
                    <p className="text-amber-200 text-sm mb-4">{blend.rarity}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">{blend.description}</p>

                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <span className="text-3xl font-black text-amber-400">{blend.price}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">{blend.originalPrice}</span>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full bg-gradient-to-r ${blend.gradient} text-white py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}>
                    <span>Add to Collection</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel - Magnificent */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-amber-900 to-orange-900" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-black text-white mb-16">What Coffee Lovers Say</h2>
          
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
                  <div className="text-6xl mb-6">{testimonial.image}</div>
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-2xl text-white mb-6 italic font-light">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="text-amber-400 font-bold text-lg">{testimonial.author}</div>
                  <div className="text-amber-200 text-sm">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-amber-400 scale-125' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Absolutely Spectacular */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-amber-900 to-black" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 mb-8">
            JOIN THE REVOLUTION
          </h2>
          <p className="text-2xl text-amber-100 mb-12 max-w-4xl mx-auto">
            Don't just drink coffee. Experience the extraordinary. Join thousands who've discovered coffee perfection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-16 py-8 rounded-full font-black text-2xl shadow-2xl hover:shadow-amber-500/50 transform hover:scale-110 transition-all duration-300">
              <span className="relative z-10 flex items-center justify-center space-x-4">
                <Users className="h-8 w-8" />
                <span>START YOUR JOURNEY</span>
                <Eye className="h-8 w-8 group-hover:rotate-180 transition-transform duration-500" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* CSS for Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes steam {
          0% { transform: translateY(0px) scale(1); opacity: 0.7; }
          100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-amber-900 via-black to-orange-900 text-amber-200 py-10 mt-12 border-t border-amber-800/40">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-black tracking-widest flex items-center gap-2">
            <span className="text-amber-400">☕</span> AKAKA COFFEE
          </div>
          <div className="text-sm text-amber-300">&copy; {new Date().getFullYear()} Akaka Coffee. All rights reserved.</div>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#" className="hover:text-white transition">Menu</a>
            <a href="#" className="hover:text-white transition">About</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;