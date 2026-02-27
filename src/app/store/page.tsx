"use client";

import { useState } from "react";
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

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const addToCart = (productId: number) => {
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

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case "New":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Hot":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Limited":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "";
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-[#0f0f0f] to-[#0f0f0f]" />
        
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Official Store
              </h1>
              <p className="text-gray-400 text-lg max-w-xl">
                アルバム、グッズ、アパレルなど、Mr.Children公式商品をお届けします。
              </p>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="text-gray-300 font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Cart Dropdown */}
      {showCart && (
        <div className="fixed top-20 right-4 md:right-8 z-50 w-80 bg-[#181818] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in-up">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-medium">Shopping Cart</h3>
          </div>
          <div className="p-4 max-h-64 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => {
                  const product = products.find((p) => p.id === item.id);
                  if (!product) return null;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-white/5"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">
                          {product.title}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {formatPrice(product.price)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-4 border-t border-white/10">
              <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
                Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Category Filter */}
      <section className="sticky top-16 z-30 bg-[#0f0f0f] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: "forwards",
                }}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden rounded-xl bg-[#181818] card-hover shine">
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-20">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getBadgeColor(
                          product.badge
                        )}`}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors duration-300 z-10" />

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover image-zoom"
                    loading="lazy"
                  />

                  {/* Hover overlay with add to cart */}
                  <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <button
                      onClick={() => addToCart(product.id)}
                      className="px-4 py-2 rounded-full bg-white/90 text-black text-sm font-medium hover:bg-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="pt-4">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                    {categories.find((c) => c.id === product.category)?.label}
                  </p>
                  <h3 className="text-gray-200 text-sm font-medium line-clamp-2 group-hover:text-white transition-colors duration-300 leading-relaxed mb-2">
                    {product.title}
                  </h3>
                  <p className="text-white font-semibold">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Shipping Info */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "Orders over ¥10,000 qualify for free shipping within Japan",
              },
              {
                icon: "🎁",
                title: "Exclusive Items",
                desc: "Official merchandise only available at the Mr.Children store",
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                desc: "Your payment information is always protected",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-white font-medium mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
