"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "News", href: "#" },
  { label: "Live", href: "#" },
  { label: "Video", href: "#" },
  { label: "Media", href: "#" },
  { label: "Biography", href: "#" },
  { label: "Discography", href: "#" },
  { label: "Store", href: "/store" },
  { label: "FATHER&MOTHER", href: "/father-mother" },
];

const socialIcons = [
  { name: "YouTube", icon: "▶" },
  { name: "Line", icon: "L" },
  { name: "X", icon: "X" },
  { name: "Instagram", icon: "📷" },
  { name: "Facebook", icon: "f" },
  { name: "Mail", icon: "✉" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "glass border-b border-white/5 shadow-lg shadow-black/20" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="text-xl font-bold tracking-wider text-gradient hover:opacity-80 transition-opacity"
            >
              Mr.Children
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Social Icons & Language */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                  title={social.name}
                >
                  <span className="text-xs">{social.icon}</span>
                </a>
              ))}
            </div>
            <button className="ml-2 px-3 py-1.5 text-xs font-medium border border-white/20 rounded-full text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300">
              Language
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slide from right */}
        <div 
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
            isMenuOpen ? "visible" : "invisible"
          }`}
        >
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Slide panel */}
          <div 
            className={`absolute top-0 right-0 h-full w-64 bg-[#0f0f0f] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Close button */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-lg font-bold text-gradient">Mr.Children</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white p-2 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Menu items */}
            <div className="p-4 space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-3 text-base font-medium hover:bg-white/5 rounded-lg transition-all duration-200"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* Social icons at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
              <div className="flex items-center justify-center space-x-4">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                    title={social.name}
                  >
                    <span className="text-sm">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
