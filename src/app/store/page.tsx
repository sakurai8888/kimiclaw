"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const categories = [
  { id: "all", label: "All" },
  { id: "album", label: "Albums" },
  { id: "merchandise", label: "Merchandise" },
  { id: "apparel", label: "Apparel" },
  { id: "accessories", label: "Accessories" },
  { id: "limited", label: "Limited Edition" },
];

const products = [
  {
    id: 1,
    category: "album",
    title: "miss you (Limited Edition)",
    price: 3500,
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop",
    badge: "New",
  },
  {
    id: 2,
    category: "album",
    title: "miss you (Standard Edition)",
    price: 2800,
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop",
    badge: null,
  },
  {
    id: 3,
    category: "album",
    title: "SOUNDTRACKS",
    price: 3200,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    badge: null,
  },
  {
    id: 4,
    category: "merchandise",
    title: "30th Anniversary T-Shirt",
    price: 4500,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    badge: "Hot",
  },
  {
    id: 5,
    category: "apparel",
    title: "Tour Hoodie 2024",
    price: 6800,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    badge: null,
  },
  {
    id: 6,
    category: "apparel",
    title: "Logo Cap",
    price: 3800,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
    badge: null,
  },
  {
    id: 7,
    category: "accessories",
    title: "Tote Bag",
    price: 2800,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
    badge: null,
  },
  {
    id: 8,
    category: "accessories",
    title: "Key Ring Set",
    price: 1800,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    badge: null,
  },
  {
    id: 9,
    category: "limited",
    title: "Complete Box Set 1992-2022",
    price: 55000,
    image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&h=400&fit=crop",
    badge: "Limited",
  },
  {
    id: 10,
    category: "limited",
    title: "Vinyl Collection Box",
    price: 28000,
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=400&fit=crop",
    badge: "Limited",
  },
  {
    id: 11,
    category: "merchandise",
    title: "Live DVD『miss you LIVE』",
    price: 5800,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
    badge: null,
  },
  {
    id: 12,
    category: "apparel",
    title: "Bandana Set",
    price: 2200,
    image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa33?w=400&h=400&fit=crop",
    badge: null,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 0,
  }).format(price);
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

// Animated counter for cart
const AnimatedCounter = ({ count }: { count: number }) => {
  const [displayCount, setDisplayCount] = useState(count);
  
  useEffect(() => {
    if (count !== displayCount) {
      const timer = setTimeout(() => setDisplayCount(count), 150);
      return () => clearTimeout(timer);
    }
  }, [count, displayCount]);
  
  return (
    <span className={`inline-block transition-all duration-300 ${count !== displayCount ? 'scale-125' : 'scale-100'}`}>
      {displayCount}
    </span>
  );
};

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const addToCart = (productId: number) => {
    setAddedToCart(productId);
    setTimeout(() => setAddedToCart(null), 1000);
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const handleCategoryChange = (catId: string) => {
    setIsLoading(true);
    setActiveCategory(catId);
    setTimeout(() => setIsLoading(false), 300);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case "New":
        return "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30";
      case "Hot":
        return "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30 animate-pulse-slow";
      case "Limited":
        return "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30";
      default:
        return "";
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer { 
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s ease-out forwards; }
        .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        .card-3d:hover {
          transform: translateY(-8px) rotateX(5deg);
        }
        .text-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <Navbar />

      {/* Hero Section with Particles */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <FloatingParticles />
        
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-[#0a0a0a]" />
        
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Rotating decorative ring */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/5 rounded-full animate-rotate-slow opacity-30" />
        <div className="absolute top-24 right-24 w-24 h-24 border border-white/5 rounded-full animate-rotate-slow opacity-20" style={{ animationDirection: 'reverse' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 animate-slide-up">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-medium text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                  Official
                </span>
                <div className="h-px w-12 bg-gradient-to-r from-indigo-500/50 to-transparent" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4 tracking-tight">
                Mr.Children Store
              </h1>
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                アルバム、グッズ、アパレルなど、<br className="hidden md:block" />
                公式商品をお届けします。
              </p>
            </div>

            {/* Animated Cart Button */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative flex items-center gap-3 px-6 py-4 rounded-2xl glass-effect hover-lift group"
            >
              <div className="relative">
                <svg
                  className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs flex items-center justify-center font-medium animate-scale-in">
                    <AnimatedCounter count={cartCount} />
                  </span>
                )}
              </div>
              <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Cart</span>
              {cartCount > 0 && (
                <span className="text-gray-500 text-sm">
                  {formatPrice(cart.reduce((sum, item) => {
                    const product = products.find((p) => p.id === item.id);
                    return sum + (product?.price || 0) * item.quantity;
                  }, 0))}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Cart Dropdown with Animation */}
      {showCart && (
        <div className="fixed top-24 right-4 md:right-8 z-50 w-96 animate-scale-in">
          <div className="glass-effect rounded-2xl shadow-2xl shadow-black/50 overflow-hidden border border-white/10">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-medium flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shopping Cart
              </h3>
              <span className="text-gray-500 text-sm">{cartCount} items</span>
            </div>
            <div className="p-4 max-h-80 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, index) => {
                    const product = products.find((p) => p.id === item.id);
                    if (!product) return null;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {product.title}
                          </p>
                          <p className="text-indigo-400 text-sm">
                            {formatPrice(product.price)} × {item.quantity}
                          </p>
                        </div>
                        <p className="text-white font-medium">
                          {formatPrice(product.price * item.quantity)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white font-medium">
                    {formatPrice(cart.reduce((sum, item) => {
                      const product = products.find((p) => p.id === item.id);
                      return sum + (product?.price || 0) * item.quantity;
                    }, 0))}
                  </span>
                </div>
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 animate-pulse-glow">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category Filter with Animation */}
      <section className="sticky top-16 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative px-6 py-2.5 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300 overflow-hidden ${
                  activeCategory === cat.id
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {activeCategory === cat.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-shimmer" />
                )}
                <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? "" 
                    : "bg-white/5 hover:bg-white/10"
                }`} />
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid with Enhanced Animations */}
      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          )}
          
          {/* Products Grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.08}s` }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Container with 3D Effect */}
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] card-3d">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border backdrop-blur-sm ${getBadgeColor(
                          product.badge
                        )}`}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Border glow on hover */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-500 z-10 ${
                    hoveredProduct === product.id 
                      ? 'border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/20' 
                      : 'border border-white/5'
                  }`} />

                  <img
                    src={product.image}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                    }`}
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`} />

                  {/* Hover overlay with add to cart */}
                  <div className={`absolute inset-0 flex items-end justify-center pb-6 transition-all duration-300 z-20 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={addedToCart === product.id}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform ${
                        addedToCart === product.id
                          ? 'bg-green-500 text-white scale-100'
                          : 'bg-white text-black hover:bg-gray-100 hover:scale-105'
                      } ${hoveredProduct === product.id ? 'translate-y-0' : 'translate-y-4'}`}
                    >
                      {addedToCart === product.id ? (
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Added!
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add to Cart
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="pt-5">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                    {categories.find((c) => c.id === product.category)?.label}
                  </p>
                  <h3 className="text-gray-200 text-sm font-medium line-clamp-2 group-hover:text-white transition-colors duration-300 leading-relaxed mb-3">
                    {product.title}
                  </h3>
                  <p className="text-xl font-bold text-gradient">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Shipping Info with Hover Effects */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "Orders over ¥10,000 qualify for free shipping within Japan",
                gradient: "from-green-500/20 to-emerald-500/20",
              },
              {
                icon: "🎁",
                title: "Exclusive Items",
                desc: "Official merchandise only available at the Mr.Children store",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                desc: "Your payment information is always protected",
                gradient: "from-blue-500/20 to-indigo-500/20",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-3xl glass-effect hover-lift cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gradient mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-8">Subscribe to get notified about new releases and exclusive offers.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}