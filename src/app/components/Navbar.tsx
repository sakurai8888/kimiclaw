"use client";

import { useState } from "react";

const navItems = [
  { label: "News", href: "#" },
  { label: "Live", href: "#" },
  { label: "Video", href: "#" },
  { label: "Media", href: "#" },
  { label: "Biography", href: "#" },
  { label: "Discography", href: "#" },
  { label: "Store", href: "#" },
  { label: "FATHER&MOTHER", href: "#" },
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

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-white text-xl font-bold tracking-wider">
              Mr.Children
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-2 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Icons & Language */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <button className="ml-4 px-3 py-1 text-xs border border-gray-600 rounded text-gray-300 hover:text-white hover:border-gray-400 transition-colors">
              Language
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}