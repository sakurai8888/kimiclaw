"use client";

import Image from "next/image";

// Sample content data - in real app, this would come from an API
const contentItems = [
  {
    id: 1,
    type: "Album",
    date: "2026.03.25",
    title: "産声",
    image: "/images/album-1.jpg",
  },
  {
    id: 2,
    type: "Download",
    date: "2026.02.21",
    title: "Saturday",
    image: "/images/single-1.jpg",
  },
  {
    id: 3,
    type: "Download",
    date: "2026.01.19",
    title: "Again",
    image: "/images/single-2.jpg",
  },
  {
    id: 4,
    type: "Video",
    date: "2025.06.25",
    title: "Live DVD & Blu-ray『miss you LIVE』",
    image: "/images/video-1.jpg",
  },
  {
    id: 5,
    type: "Download",
    date: "2024.08.30",
    title: "in the pocket",
    image: "/images/single-3.jpg",
  },
  {
    id: 6,
    type: "Download",
    date: "2024.05.03",
    title: "記憶の旅人",
    image: "/images/single-4.jpg",
  },
  {
    id: 7,
    type: "Album",
    date: "2023.10.04",
    title: "miss you 完全生産限定盤 (LIMITED BOX仕様)",
    image: "/images/album-2.jpg",
  },
  {
    id: 8,
    type: "Album",
    date: "2023.10.04",
    title: "miss you 通常盤",
    image: "/images/album-3.jpg",
  },
  {
    id: 9,
    type: "Video",
    date: "2023.01.25",
    title: "Live DVD & Blu-ray『Mr.Children 30th Anniversary Tour』",
    image: "/images/video-2.jpg",
  },
  {
    id: 10,
    type: "Album",
    date: "2022.05.11",
    title: "Mr.Children 2015 - 2021 & NOW",
    image: "/images/album-4.jpg",
  },
  {
    id: 11,
    type: "Album",
    date: "2022.05.11",
    title: "Mr.Children 2011 - 2015",
    image: "/images/album-5.jpg",
  },
  {
    id: 12,
    type: "Download",
    date: "2022.03.24",
    title: "永遠",
    image: "/images/single-5.jpg",
  },
  {
    id: 13,
    type: "Album",
    date: "2020.12.02",
    title: "SOUNDTRACKS",
    image: "/images/album-6.jpg",
  },
  {
    id: 14,
    type: "Download",
    date: "2020.09.16",
    title: "turn over?",
    image: "/images/single-6.jpg",
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "Album":
      return "bg-gray-600";
    case "Single":
      return "bg-blue-600";
    case "Download":
      return "bg-green-600";
    case "Video":
      return "bg-red-600";
    case "Book":
      return "bg-purple-600";
    default:
      return "bg-gray-600";
  }
};

// Placeholder image component
const PlaceholderImage = ({ className }: { className?: string }) => (
  <div className={`bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center ${className}`}>
    <span className="text-gray-500 text-4xl">♪</span>
  </div>
);

export default function ContentGrid() {
  return (
    <div className="bg-[#1a1a1a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {contentItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className="group block bg-[#252525] rounded overflow-hidden hover:bg-[#303030] transition-colors"
            >
              {/* Image Container */}
              <div className="aspect-square relative overflow-hidden">
                <PlaceholderImage className="w-full h-full" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all" />
              </div>

              {/* Content */}
              <div className="p-3">
                {/* Type Badge & Date */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`${getTypeColor(item.type)} text-white text-xs px-2 py-0.5 rounded`}>
                    {item.type}
                  </span>
                  <span className="text-gray-500 text-xs">{item.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-gray-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}