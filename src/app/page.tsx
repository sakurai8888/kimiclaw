"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import FilterTabs from "./components/FilterTabs";
import ContentGrid from "./components/ContentGrid";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <main className="min-h-screen bg-[#0f0f0f] pt-16">
      <Navbar />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <ContentGrid activeFilter={activeFilter} />
    </main>
  );
}
