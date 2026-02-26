"use client";

import { useState, useRef, useEffect } from "react";

const filters = [
  { label: "All", value: "all" },
  { label: "Single", value: "single" },
  { label: "Album", value: "album" },
  { label: "Download", value: "download" },
  { label: "Video", value: "video" },
  { label: "Book", value: "book" },
];

export default function FilterTabs() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeIndex = filters.findIndex(f => f.value === activeFilter);
    const activeTab = tabsRef.current[activeIndex];
    if (activeTab && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      setIndicatorStyle({
        left: tabRect.left - containerRect.left + containerRef.current.scrollLeft,
        width: tabRect.width,
      });
    }
  }, [activeFilter]);

  return (
    <div className="sticky top-16 z-30 bg-[#0f0f0f] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={containerRef}
          className="relative flex items-center justify-center py-4 overflow-x-auto scrollbar-hide"
        >
          {/* Animated indicator */}
          <div 
            className="absolute bottom-3 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
          
          <div className="flex items-center space-x-1">
            {filters.map((filter, index) => (
              <button
                key={filter.value}
                ref={el => { tabsRef.current[index] = el; }}
                onClick={() => setActiveFilter(filter.value)}
                className={`relative px-5 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 rounded-full ${
                  activeFilter === filter.value
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {filter.label}
                {activeFilter === filter.value && (
                  <span className="absolute inset-0 rounded-full bg-white/5 -z-10" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
