"use client";

import { useState, useEffect } from "react";

// News items ordered by latest release date
const newsItems = [
  {
    id: 1,
    type: "Album",
    date: "2026.03.25",
    title: "産声",
    subtitle: "New Album Release",
    description: "The latest album from Mr.Children, featuring a collection of powerful tracks that showcase the band's evolution.",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    type: "Download",
    date: "2026.02.21",
    title: "Saturday",
    subtitle: "New Single Release",
    description: "A fresh digital single that captures the essence of the weekend vibes.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    type: "Download",
    date: "2026.01.19",
    title: "Again",
    subtitle: "New Single Release",
    description: "An emotional track that resonates with listeners through its heartfelt lyrics.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    type: "Video",
    date: "2025.06.25",
    title: "Live DVD & Blu-ray『miss you LIVE』",
    subtitle: "Live Performance Release",
    description: "Experience the unforgettable live performance from the miss you tour.",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    type: "Download",
    date: "2024.08.30",
    title: "in the pocket",
    subtitle: "New Single Release",
    description: "A groovy track that keeps you moving with its infectious rhythm.",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop",
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "Album":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    case "Single":
      return "bg-pink-500/20 text-pink-300 border-pink-500/30";
    case "Download":
      return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    case "Video":
      return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "Book":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

export default function NewsHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const currentItem = newsItems[currentIndex];

  return (
    <section className="relative min-h-screen bg-[#0f0f0f] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentItem.image}
          alt={currentItem.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isTransitioning ? "opacity-30 scale-105" : "opacity-40 scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#0f0f0f]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Text Content */}
          <div className={`space-y-6 transition-all duration-500 ${isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
            {/* Type Badge */}
            <div className="flex items-center gap-4">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getTypeColor(currentItem.type)}`}>
                {currentItem.type}
              </span>
              <span className="text-gray-400 text-sm">{currentItem.date}</span>
            </div>

            {/* Subtitle */}
            <p className="text-indigo-400 text-sm font-medium tracking-wider uppercase">
              {currentItem.subtitle}
            </p>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {currentItem.title}
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              {currentItem.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/discography"
                className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300"
              >
                View Details
              </a>
              <a
                href="/discography"
                className="px-8 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
              >
                All Releases
              </a>
            </div>
          </div>

          {/* Right: Featured Image Card */}
          <div className={`hidden lg:block transition-all duration-500 ${isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Play button for videos */}
              {currentItem.type === "Video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300"
                aria-label="Previous"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300"
                aria-label="Next"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="text-white/60 text-sm font-medium">
              <span className="text-white">{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="mx-2">/</span>
              <span>{String(newsItems.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
