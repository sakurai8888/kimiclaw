"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

const conceptCards = [
  {
    id: 1,
    title: "Origin",
    subtitle: "始まりの物語",
    description: "すべてはここから始まった。音楽という形で紡がれる、僕たちの物語。",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Connection",
    subtitle: "繋がり",
    description: "アーティストとファン、音楽と心、過去と未来。すべてを繋ぐ存在でありたい。",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Future",
    subtitle: "未来へ",
    description: "新しい音楽、新しい出会い、新しい感動。これからも共に歩んでいく。",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
  },
];

const galleryItems = [
  { id: 1, title: "Special Live 2024", date: "2024.12.15", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop" },
  { id: 2, title: "Documentary Film", date: "2024.08.20", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop" },
  { id: 3, title: "Fan Meeting", date: "2024.05.10", image: "https://images.unsplash.com/photo-1459749411177-047381bb3ece?w=400&h=300&fit=crop" },
  { id: 4, title: "Behind the Scenes", date: "2024.03.01", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop" },
];

export default function FatherMotherPage() {
  const [activeTab, setActiveTab] = useState("concept");

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-[#0f0f0f] to-[#0f0f0f]" />
        
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6 opacity-0 animate-fade-in-up">
            <span className="text-gray-400 text-sm tracking-[0.3em] uppercase">A Special Project by</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 opacity-0 animate-fade-in-up stagger-1">
            <span className="text-gradient-accent">FATHER</span>
            <span className="text-gray-500 mx-2">&</span>
            <span className="text-gradient-accent">MOTHER</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up stagger-2">
            音楽を通じて、人と人を繋ぐ。<br className="hidden md:block" />
            これまでの軌跡と、これからの物語。
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up stagger-3">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105">
              Explore Content
            </button>
            <button className="px-8 py-3 rounded-full border border-white/20 text-gray-300 font-medium hover:bg-white/5 hover:border-white/40 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-16 z-30 bg-[#0f0f0f] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-1 py-4">
            {[
              { id: "concept", label: "Concept" },
              { id: "gallery", label: "Gallery" },
              { id: "message", label: "Message" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  activeTab === tab.id
                    ? "text-white bg-white/10"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Concept Tab */}
          {activeTab === "concept" && (
            <div className="space-y-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">Project Concept</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  FATHER&MOTHER は、Mr.Childrenの音楽的ルーツと未来への架け橋となる特別なプロジェクトです。
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {conceptCards.map((card, index) => (
                  <div
                    key={card.id}
                    className="group relative bg-[#181818] rounded-2xl overflow-hidden card-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover image-zoom"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs text-indigo-400 font-medium tracking-wider">{card.subtitle}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">Gallery</h2>
                <p className="text-gray-500">特別な瞬間を写真で振り返る</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryItems.map((item, index) => (
                  <a
                    key={item.id}
                    href="#"
                    className="group block opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#181818] card-hover shine">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover image-zoom"
                      />
                    </div>
                    <div className="mt-4">
                      <span className="text-xs text-gray-500">{item.date}</span>
                      <h3 className="text-white font-medium group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Message Tab */}
          {activeTab === "message" && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">Message</h2>
              </div>
              
              <div className="bg-gradient-to-br from-[#181818] to-[#1a1a2e] rounded-3xl p-8 md:p-12 border border-white/5">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
                    🎵
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">桜井和寿</h3>
                    <p className="text-gray-500 text-sm">Vocal & Guitar</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-300 leading-relaxed text-lg space-y-4">
                  <p>
                    「FATHER&MOTHER」という名前には、僕たちの音楽の原点と、それを受け継いでいく未来への想いが込められています。
                  </p>
                  <p>
                    音楽は人と人を繋ぐ力を持っています。長い歴史の中で支えてくれた皆さんへの感謝と、これから出会う新しい仲間たちへの期待。
                  </p>
                  <p>
                    このプロジェクトを通じて、より多くの人々と「音楽」という形で繋がっていけたらと思います。
                  </p>
                </blockquote>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-gray-500 text-sm text-right">
                    2026年2月<br />
                    Mr.Children
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join FATHER&MOTHER</h2>
          <p className="text-gray-400 mb-8">最新情報や特別なコンテンツをお届けします</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
