"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductModal from "../components/ProductModal";

const categories = [
  { id: "all", label: "All" },
  { id: "albums", label: "Albums" },
  { id: "goods", label: "Goods" },
  { id: "live-goods", label: "Live Goods" },
  { id: "dvd-blu-ray", label: "DVD/Blu-ray" },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 0,
  }).format(price);
};

// Floating particles component - client-side only to avoid hydration mismatch
const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ left: number; top: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate random values only on client side
    const newParticles = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setParticles(newParticles);
    setMounted(true);
  }, []);

  // Return empty during SSR to ensure server/client match
  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
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

interface Product {
  _id: string;
  sku: string;
  name: string;
  nameEn?: string;
  description?: string;
  price: {
    amount: number;
    currency: string;
    compareAtPrice?: number;
  };
  category: {
    name: string;
    slug: string;
  };
  tags?: string[];
  images: {
    main: string;
    thumbnail?: string;
  };
  seo?: {
    slug: string;
  };
  featured?: boolean;
  ratings?: {
    average: number;
    count: number;
  };
}

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products from MongoDB
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category?.slug === activeCategory);

  const addToCart = (productId: string) => {
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
    setActiveCategory(catId);
  };

  const openProductModal = (productId: string) => {
    setSelectedProduct(productId);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getBadgeColor = (tags?: string[]) => {
    if (!tags) return "bg-gray-500/80";
    if (tags.includes('New Release')) return "bg-gradient-to-r from-emerald-500 to-teal-500";
    if (tags.includes('Limited Edition')) return "bg-gradient-to-r from-amber-500 to-orange-500";
    if (tags.includes('Hot')) return "bg-gradient-to-r from-rose-500 to-pink-500";
    return "bg-gradient-to-r from-indigo-500 to-purple-500";
  };

  const getBadgeText = (tags?: string[]) => {
    if (!tags) return null;
    if (tags.includes('New Release')) return "New";
    if (tags.includes('Limited Edition')) return "Limited";
    if (tags.includes('Hot')) return "Hot";
    return null;
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] relative overflow-hidden">
      <Navbar />
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-[#0f0f0f] to-[#0f0f0f]" />
        <FloatingParticles />
        
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-gray-400">Store is Open</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Official Store
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 animate-fade-in">
            アルバム、グッズ、ライブ商品など、Mr.Children公式商品をお届けします
          </p>

          {/* Cart Button */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
          >
            <span className="text-xl">🛒</span>
            <span className="text-gray-300">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-bold animate-bounce">
                <AnimatedCounter count={cartCount} />
              </span>
            )}
          </button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden group ${
                  activeCategory === cat.id
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeCategory === cat.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
                )}
                <span className={`absolute inset-0 rounded-full border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "border-transparent"
                    : "border-white/10 group-hover:border-white/30"
                }`} />
                
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => {
                const badgeText = getBadgeText(product.tags);
                return (
                  <div
                    key={product._id}
                    onClick={() => openProductModal(product._id)}
                    className="group relative bg-gradient-to-b from-white/5 to-white/[0.02] rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all duration-500 cursor-pointer"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}
                    onMouseEnter={() => setHoveredProduct(product._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.images?.main || '/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                        hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
                      }`} />
                      
                      {/* Badge */}
                      {badgeText && (
                        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-full ${getBadgeColor(product.tags)}`}>
                          {badgeText}
                        </span>
                      )}
                      
                      {/* Quick View */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30">
                          詳細を見る
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">{product.category?.name}</span>
                      
                      <h3 className="mt-1 text-sm font-medium text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">
                        {product.name}
                      </h3>
                      
                      {product.nameEn && (
                        <p className="text-xs text-gray-500 mt-0.5">{product.nameEn}</p>
                      )}
                      
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-lg font-bold text-gradient">
                          {formatPrice(product.price?.amount || 0)}
                        </span>
                        
                        {product.ratings && (
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-yellow-400">★</span>
                            <span className="text-gray-400">{product.ratings.average}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        productId={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeProductModal}
      />
    </main>
  );
}
