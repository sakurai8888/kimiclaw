"use client";

// Sample content data with Unsplash images
const contentItems = [
  {
    id: 1,
    type: "Album",
    date: "2026.03.25",
    title: "産声",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    type: "Download",
    date: "2026.02.21",
    title: "Saturday",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    type: "Download",
    date: "2026.01.19",
    title: "Again",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    type: "Video",
    date: "2025.06.25",
    title: "Live DVD & Blu-ray『miss you LIVE』",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    type: "Download",
    date: "2024.08.30",
    title: "in the pocket",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    type: "Download",
    date: "2024.05.03",
    title: "記憶の旅人",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    type: "Album",
    date: "2023.10.04",
    title: "miss you 完全生産限定盤",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    type: "Album",
    date: "2023.10.04",
    title: "miss you 通常盤",
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop",
  },
  {
    id: 9,
    type: "Video",
    date: "2023.01.25",
    title: "30th Anniversary Tour",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop",
  },
  {
    id: 10,
    type: "Album",
    date: "2022.05.11",
    title: "2015 - 2021 & NOW",
    image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&h=400&fit=crop",
  },
  {
    id: 11,
    type: "Album",
    date: "2022.05.11",
    title: "2011 - 2015",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
  },
  {
    id: 12,
    type: "Download",
    date: "2022.03.24",
    title: "永遠",
    image: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=400&h=400&fit=crop",
  },
  {
    id: 13,
    type: "Album",
    date: "2020.12.02",
    title: "SOUNDTRACKS",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
  },
  {
    id: 14,
    type: "Download",
    date: "2020.09.16",
    title: "turn over?",
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=400&h=400&fit=crop",
  },
  {
    id: 15,
    type: "Single",
    date: "2020.08.12",
    title: "Birthday",
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=400&fit=crop",
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "Album":
      return "border-purple-500/50 text-purple-300";
    case "Single":
      return "border-pink-500/50 text-pink-300";
    case "Download":
      return "border-cyan-500/50 text-cyan-300";
    case "Video":
      return "border-amber-500/50 text-amber-300";
    case "Book":
      return "border-emerald-500/50 text-emerald-300";
    default:
      return "border-gray-500/50 text-gray-300";
  }
};

export default function ContentGrid() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] py-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {contentItems.map((item, index) => (
            <a
              key={item.id}
              href="#"
              className="group block opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#181818] card-hover shine">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                
                {/* Border glow */}
                <div className="absolute inset-0 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors duration-300" />
                
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover image-zoom"
                  loading="lazy"
                />
                
                {/* Play button overlay for videos */}
                {item.type === "Video" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="pt-4">
                {/* Type Badge & Date */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${getTypeColor(item.type)} bg-transparent`}>
                    {item.type}
                  </span>
                  <span className="text-gray-500 text-xs">{item.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-gray-200 text-sm font-medium line-clamp-2 group-hover:text-white transition-colors duration-300 leading-relaxed">
                  {item.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-sm font-medium">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
