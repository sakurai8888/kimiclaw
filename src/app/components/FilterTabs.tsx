"use client";

import { useRef, useEffect } from "react";

const filters = [
  { label: "All", value: "all" },
  { label: "Single", value: "single" },
  { label: "Album", value: "album" },
  { label: "Download", value: "download" },
  { label: "Video", value: "video" },
  { label: "Book", value: "book" },
];

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeButton = container.querySelector(`[data-filter="${activeFilter}"]`) as HTMLElement;
    if (activeButton && indicatorRef.current) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      indicatorRef.current.style.left = `${buttonRect.left - containerRect.left + container.scrollLeft}px`;
      indicatorRef.current.style.width = `${buttonRect.width}px`;
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
            ref={indicatorRef}
            className="absolute bottom-3 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
          />
          
          <div className="flex items-center space-x-1">
            {filters.map((filter) => (
              <button
                key={filter.value}
                data-filter={filter.value}
                onClick={() => onFilterChange(filter.value)}
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
