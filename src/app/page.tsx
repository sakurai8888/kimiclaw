import Navbar from "./components/Navbar";
import FilterTabs from "./components/FilterTabs";
import ContentGrid from "./components/ContentGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <Navbar />
      <FilterTabs />
      <ContentGrid />
    </main>
  );
}