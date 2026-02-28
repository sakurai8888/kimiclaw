"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// Rotating images for the band introduction section
const bandImages = [
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
];

const bandMembers = [
  {
    id: 1,
    name: "桜井 和寿",
    nameEn: "Sakurai Kazutoshi",
    role: "Vocals / Guitar",
    description: "桜井和寿はMr.Childrenのリーダーであり、ボーカリスト兼ギタリストとして活躍しています。1966年3月7日生まれ。作詞・作曲も手がけ、バンドの中心的人物として多くのヒット曲を生み出してきました。感情豊かな歌唱力と深い lyricism で知られ、日本を代表するロックミュージシャンの一人です。",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    name: "田原 健一",
    nameEn: "Tahara Kenichi",
    role: "Guitar",
    description: "田原健一はMr.Childrenのギタリストとして、1970年2月24日生まれ。東京の中学校で他のメンバーと出会い、バンドの結成に参加しました。繊細で感情豊かなギターワークが特徴で、桜井のボーカルと絶妙な相性を持っています。",
    image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=400&h=500&fit=crop",
  },
  {
    id: 3,
    name: "中川 敬輔",
    nameEn: "Nakagawa Keisuke",
    role: "Bass",
    description: "中川敬輔はMr.Childrenのベーシストとして、1969年10月9日生まれ。東京の中学校で他のメンバーと出会い、バンドの基盤を支える重要な存在です。安定したベースラインとグルーブ感あふれる演奏がバンドのサウンドに深みを与えています。",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe_qM69Fafc-E5h7ga7FlGSihlWUhANR0kCw&s",
  },
  {
    id: 4,
    name: "鈴木 英哉",
    nameEn: "Suzuki Hideya",
    role: "Drums",
    description: "鈴木英哉はMr.Childrenのドラマーとして、1969年10月23日生まれ。パワフルかつ繊細なドラミングが特徴で、バンドのリズムセクションを牽引しています。東京の中学校で他のメンバーと出会い、30年以上にわたってバンドのビートを支え続けています。",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=500&fit=crop",
  },
];

export default function BiographyPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate band images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bandImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Biography
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Band Introduction */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Rotating Image Carousel */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {bandImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Mr.Children ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 to-transparent" />
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {bandImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Mr.Children
              </h2>
              <p className="text-purple-400 text-lg font-medium">
                1989年結成 / 日本のロックバンド
              </p>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Mr.Children（ミスターチルドレン）は、1989年に結成された日本のロックバンド。桜井和寿（ボーカル・ギター）、田原健一（ギター）、中川敬輔（ベース）、鈴木英哉（ドラム）の4人組で構成されています。
                </p>
                <p>
                  1992年に「君がいた夏」でメジャーデビューを果たし、「CROSS ROAD」「innocent world」「Tomorrow never knows」「Sign」など、数多くのヒット曲を生み出してきました。深い lyricism とキャッチーなメロディが特徴で、日本を代表するロックバンドとして不動の地位を築いています。
                </p>
                <p>
                  30年以上にわたる活動の中で、日本の音楽シーンに多大な影響を与え続け、世代を超えて愛される存在となっています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section className="py-20 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Members
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {bandMembers.map((member, index) => (
              <div
                key={member.id}
                className="group bg-[#181818] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid sm:grid-cols-[200px_1fr] gap-0">
                  {/* Member Image */}
                  <div className="aspect-[4/5] sm:aspect-auto overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Member Info */}
                  <div className="p-6 flex flex-col justify-center">
                    <div className="space-y-2">
                      <p className="text-indigo-400 text-sm font-medium tracking-wider">
                        {member.role}
                      </p>
                      <h3 className="text-2xl font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {member.nameEn}
                      </p>
                    </div>
                    <p className="mt-4 text-gray-300 text-sm leading-relaxed line-clamp-4">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              History
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-8">
            {[
              { year: "1989", title: "バンド結成", desc: "田原、中川、鈴木の3人が中学校で出会い、バンド活動を開始。後に桜井が加入。" },
              { year: "1992", title: "メジャーデビュー", desc: "シングル「君がいた夏」でメジャーデビュー。" },
              { year: "1994", title: "ブレイク", desc: "「CROSS ROAD」「innocent world」が大ヒットし、国民的バンドとなる。" },
              { year: "1996", title: "ドーム公演", desc: "東京ドームでの公演を成功させる。" },
              { year: "2017", title: "30周年", desc: "結成30周年を迎え、記念ツアーを開催。" },
              { year: "2024", title: "現在", desc: "結成35周年を迎え、新曲「産声」をリリース。" },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-2xl font-bold text-purple-400">{item.year}</span>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className="w-4 h-4 rounded-full bg-purple-500 mt-2" />
                  {index !== 5 && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-purple-500/50 to-transparent" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            © Mr.Children All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
