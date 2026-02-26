"use client";

import { useState } from "react";

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

  return (
    <div className="bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-0 py-4 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors bg-transparent border-none ${
                activeFilter === filter.value
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}