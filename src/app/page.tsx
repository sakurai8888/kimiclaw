import Navbar from "./components/Navbar";
import FilterTabs from "./components/FilterTabs";
import ContentGrid from "./components/ContentGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] pt-16">
      <Navbar />
      <FilterTabs />
      <ContentGrid />
    </main>
  );
}
