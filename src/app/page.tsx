"use client";

import Navbar from "./components/Navbar";
import NewsHero from "./components/NewsHero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <NewsHero />
    </main>
  );
}
