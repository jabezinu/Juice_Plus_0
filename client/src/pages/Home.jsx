import React, { useState, useEffect, useRef } from 'react';
import { Star, Play, ArrowRight, Coffee, Sparkles, Heart, Award, Zap, Globe, Users, ChevronDown, Eye, Leaf, Mountain, Sun, Moon, MapPin, Phone, Mail } from 'lucide-react';
import {Link} from 'react-router-dom';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [coffeeBeans, setCoffeeBeans] = useState([]);
  const [timeOfDay, setTimeOfDay] = useState('morning');
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

    // Generate floating coffee beans
    const beans = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 8,
      speed: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
    setCoffeeBeans(beans);

    // Set time of day based on current hour
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialInterval);
  }, []);

  const testimonials = [
    {
      text: "The aroma alone transported me to the Ethiopian highlands. This coffee is pure poetry in a cup.",
      title: "Coffee Enthusiast",
      rating: 5,
    },
    {
      text: "I've traveled the world for coffee, but nothing compares to Akaka's incredible depth of flavor.",
      title: "Travel Blogger",
      rating: 5,
    },
    {
      text: "As a barista, I can confidently say this is the finest coffee I've ever worked with. Absolutely exceptional.",
      title: "Master Barista",
      rating: 5,
    }
  ];

  const premiumBlends = [
    {
      name: "Ethiopian Highlands",
      description: "Single-origin beans from the birthplace of coffee, with bright floral notes and wine-like acidity",
      price: "$34.99",
      originalPrice: "$44.99",
      badge: "ORIGIN",
      rarity: "Limited harvest",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
      gradient: "from-emerald-600 to-teal-500"
    },
    {
      name: "Volcanic Roast",
      description: "Medium roast with rich chocolate undertones and a hint of smoky volcanic earth",
      price: "$29.99",
      originalPrice: "$39.99",
      badge: "SIGNATURE",
      rarity: "Our bestseller",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
      gradient: "from-amber-600 to-orange-500"
    },
    {
      name: "Mountain Mist",
      description: "Light roast with delicate citrus notes and a silky smooth finish from high-altitude beans",
      price: "$32.99",
      originalPrice: "$42.99",
      badge: "PREMIUM",
      rarity: "High altitude grown",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      gradient: "from-blue-600 to-purple-500"
    }
  ];

  const FloatingBean = ({ bean }) => (
    <div 
      className="absolute opacity-20 animate-float"
      style={{
        left: `${bean.x}%`,
        top: `${bean.y}%`,
        width: `${bean.size}px`,
        height: `${bean.size}px`,
        animationDelay: `${bean.delay}s`,
        animationDuration: `${bean.speed + 3}s`,
      }}
    >
      <div className="w-full h-full bg-amber-800 rounded-full transform rotate-45" />
    </div>
  );

  const timeBasedGradient = {
    morning: 'from-orange-300 via-yellow-200 to-amber-100',
    afternoon: 'from-blue-300 via-cyan-200 to-teal-100',
    evening: 'from-purple-300 via-pink-200 to-rose-100'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 text-stone-800 overflow-hidden relative">
      {/* Floating Coffee Beans */}
      {coffeeBeans.map((bean) => (
        <FloatingBean key={bean.id} bean={bean} />
      ))}

      {/* Hero Section - Natural & Elegant */}
      <section ref={heroRef} className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden pt-36 md:pt-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop')`,
              filter: 'brightness(0.4)'
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${timeBasedGradient[timeOfDay]} opacity-20`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* Organic Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto py-12">
          {/* Floating Badge */}
          <div className="mb-8 inline-flex items-center space-x-3 bg-white/20 backdrop-blur-xl px-8 py-4 rounded-full border border-white/30 shadow-xl">
            <Coffee className="h-5 w-5 text-amber-300" />
            <span className="text-sm font-medium text-white">Addis Ababa's Premier Coffee Experience</span>
            <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
          </div>

          {/* Main Title with Natural Typography */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white drop-shadow-2xl">
              Akaka
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 font-light italic">
              Coffee
            </span>
          </h1>

          {/* Subtitle with Better Typography */}
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Where tradition meets innovation. Experience the rich heritage of Ethiopian coffee culture with our carefully sourced and expertly roasted premium beans.
          </p>

          {/* CTA Buttons with Natural Design */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/">
              <button className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Coffee className="h-5 w-5" />
                  <span>Explore Collection</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            
              <Link to="/about">
                <button className="group relative overflow-hidden bg-white/20 backdrop-blur-xl text-white px-8 py-4 rounded-full font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300">
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Our Story</span>
                    <Mountain className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </span>
                </button>
              </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ChevronDown className="h-6 w-6 text-white/80 mx-auto" />
          </div>
        </div>
      </section>

      {/* Statistics Section - Clean & Natural */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "25K+", label: "Happy Customers", icon: Heart, color: "text-red-500" },
              { number: "100%", label: "Organic & Fair Trade", icon: Leaf, color: "text-green-500" },
              { number: "2+", label: "Years Experience", icon: Award, color: "text-amber-500" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <stat.icon className={`h-10 w-10 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                  <div className="text-3xl font-bold text-stone-800 mb-2">{stat.number}</div>
                  <div className="text-stone-600 font-medium text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Blends - Natural Layout */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              Our Premium Collection
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Discover our signature blends, each carefully crafted to deliver an exceptional coffee experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {premiumBlends.map((blend, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                  {/* Badge */}
                  <div className={`absolute top-4 right-4 z-10 bg-gradient-to-r ${blend.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {blend.badge}
                  </div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={blend.image} 
                      alt={blend.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{blend.name}</h3>
                    <p className="text-stone-600 text-sm mb-1">{blend.rarity}</p>
                    <p className="text-stone-700 mb-4 leading-relaxed text-sm">{blend.description}</p>

                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                      ))}
                    </div>

                    {/* Price */}
                    <div className="text-center mb-6">
                      <span className="text-2xl font-bold text-stone-800">{blend.price}</span>
                      <span className="text-sm text-stone-500 line-through ml-2">{blend.originalPrice}</span>
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full bg-gradient-to-r ${blend.gradient} text-white py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}>
                      <span>Add to Cart</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Elegant Carousel */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-100 to-amber-50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-stone-800 mb-16">What Our Customers Say</h2>
          
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                }`}
              >
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-stone-700 mb-4 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="text-stone-800 font-semibold">{testimonial.author}</div>
                  <div className="text-stone-600 text-sm">{testimonial.title}</div>
                  <div className="text-stone-500 text-xs mt-1 flex items-center justify-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-amber-500 scale-125' : 'bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=600&fit=crop')`,
              filter: 'brightness(0.3)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-orange-900/80" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience Excellence?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of coffee lovers who have discovered the perfect cup. Start your coffee journey with us today.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Akaka Coffee</h3>
              <p className="text-stone-400 text-sm">
                Premium Ethiopian coffee roasted to perfection. Experience the difference quality makes.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm w-full">
                <li><Link to="/home" className="text-stone-400 hover:text-amber-400 transition">Home</Link></li>
                <li><Link to="/" className="text-stone-400 hover:text-amber-400 transition">Menu</Link></li>
                <li><Link to="/about" className="text-stone-400 hover:text-amber-400 transition">About</Link></li>
                <li><Link to="/contact" className="text-stone-400 hover:text-amber-400 transition">Contact</Link></li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm w-full">
                <div className="flex items-center text-stone-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center text-stone-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+251 903 243174</span>
                </div>
                <div className="flex items-center text-stone-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contact@akakacoffee.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Akaka Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;