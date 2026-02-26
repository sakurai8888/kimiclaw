"use client";

// Sample content data with Unsplash images
const contentItems = [
  {
    id: 1,
    type: "Album",
    date: "2026.03.25",
    title: "産声",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
  },
  {
    id: 2,
    type: "Download",
    date: "2026.02.21",
    title: "Saturday",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
  },
  {
    id: 3,
    type: "Download",
    date: "2026.01.19",
    title: "Again",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
  },
  {
    id: 4,
    type: "Video",
    date: "2025.06.25",
    title: "Live DVD & Blu-ray『miss you LIVE』",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
  },
  {
    id: 5,
    type: "Download",
    date: "2024.08.30",
    title: "in the pocket",
    image: "https://images.unsplash.com/photo-1459749411177-047381bb3ece?w=300&h=300&fit=crop",
  },
  {
    id: 6,
    type: "Download",
    date: "2024.05.03",
    title: "記憶の旅人",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
  },
  {
    id: 7,
    type: "Album",
    date: "2023.10.04",
    title: "miss you 完全生産限定盤",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=300&h=300&fit=crop",
  },
  {
    id: 8,
    type: "Album",
    date: "2023.10.04",
    title: "miss you 通常盤",
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
  },
  {
    id: 9,
    type: "Video",
    date: "2023.01.25",
    title: "30th Anniversary Tour",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop",
  },
  {
    id: 10,
    type: "Album",
    date: "2022.05.11",
    title: "2015 - 2021 & NOW",
    image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=300&h=300&fit=crop",
  },
  {
    id: 11,
    type: "Album",
    date: "2022.05.11",
    title: "2011 - 2015",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
  },
  {
    id: 12,
    type: "Download",
    date: "2022.03.24",
    title: "永遠",
    image: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=300&h=300&fit=crop",
  },
  {
    id: 13,
    type: "Album",
    date: "2020.12.02",
    title: "SOUNDTRACKS",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
  },
  {
    id: 14,
    type: "Download",
    date: "2020.09.16",
    title: "turn over?",
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=300&h=300&fit=crop",
  },
  {
    id: 15,
    type: "Single",
    date: "2020.08.12",
    title: "Birthday",
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&h=300&fit=crop",
  },
];

export default function ContentGrid() {
  return (
    <div className="bg-[#1a1a1a] py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {contentItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className="group block"
            >
              {/* Image Container */}
              <div className="aspect-square relative overflow-hidden bg-gray-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="pt-3">
                {/* Type Badge & Date - transparent background */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white text-xs px-2 py-0.5 border border-gray-500 bg-transparent">
                    {item.type}
                  </span>
                  <span className="text-gray-400 text-xs">{item.date}</span>
                </div>

                {/* Title - white text, no background */}
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