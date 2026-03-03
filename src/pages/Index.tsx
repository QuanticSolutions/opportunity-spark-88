import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import CountersSection from "@/components/CountersSection";
import SearchBar from "@/components/SearchBar";
import PartnersSection from "@/components/PartnersSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />
    <main className="flex-1">
      <HeroSection />
      <CategoryGrid />
      <SearchBar />
      <CountersSection />
      <PartnersSection />
    </main>
    <SiteFooter />
  </div>
);

export default Index;
